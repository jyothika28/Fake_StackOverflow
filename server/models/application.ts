import Answers from "./answers";
import {IAnswer, IComment, IQuestion, IUser} from "./types/types";
import Questions from "./questions";
import Tags from "./tags";
import User from "./users";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Session } from "express-session";
import Comments from "./comments";
import Answer from "./answers";


export type SortOrder = "active" | "newest" | "unanswered";
export type ErrorWrapped<T> = { error: string } | T;



/**
 * Function to insert a new user into the MongoDB database
 * @param userData - The user data to insert
 * @returns The inserted user
 */
const insertNewUser = async (userData: IUser) => {
  const { firstname, lastname, username, email, password, dob } = userData;
  console.log("userData", userData);
  // Check if the email or username already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  console.log("existingUser", existingUser);
  if (existingUser) {
    const conflictField = existingUser.email === email ? 'email' : 'username';
    console.log("conflictField", conflictField);
    const conflictMessage =
      conflictField === 'email'
        ? 'This email is already registered. Please use a different email or log in.'
        : 'This username is already in use. Please choose a different username.';
    throw new Error(conflictMessage);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
    dob,
  });

  // Save the user to the database
  await newUser.save();

  return newUser;
};


/**
 * Function to authenticate a user
 * @param username - The username of the user
 * @param password - The password of the user
 * @returns The authenticated user
 */
const authenticateUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('No account found with this username. Please register or try again.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials. Please try again.');
  }

  return user;
};

/**
 * Function to destroy the user session
 * @param session - The session object
 * @returns A promise that resolves when the session is destroyed
 */
const logoutUser = (session: Session) => {
  return new Promise<void>((resolve, reject) => {
    session.destroy((error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
  
/**
 * A function to add a tag to the database
 * @param tname the tag name
 * @returns the id of an existing tag or the id of the newly added tag
 */
const addTag = async (tname: string): Promise<string | null> => {
  try {
    const existingTag = await Tags.findOne({ name: tname });
    if (existingTag) {
      return existingTag._id; // Return the existing tag's ID
    }

    const newTag = new Tags({ name: tname });
    await newTag.save();
    return newTag._id; // Return the new tag's ID
  } catch (error) {
    console.error("Error adding tag:", error);
    return null; // Return null if an error occurs
  }
};


/**
 * This function retrieves questions from the database based on the provided order
 * @param order the sorting order for the questions 
 * @returns a list of questions based on the provided order
 */
const getQuestionsByOrder = async (order: SortOrder): Promise<IQuestion[]> => {
  try {
    let questions: IQuestion[];
    // Determine the sorting criteria based on the provided order
    switch (order) {
      case "newest":
        // Sort by ask_date_time in descending order for newest questions

        questions = await Questions.find().exec();
        for (let i = 0; i < questions.length - 1; i++) {
          for (let j = i + 1; j < questions.length; j++) {
            if (questions[i].ask_date_time < questions[j].ask_date_time) {
              // Swap questions[i] and questions[j]
              const temp = questions[i];
              questions[i] = questions[j];
              questions[j] = temp;
            }
          }
        }
        break;
      case "active":
        questions = await Questions.find().exec();

        // Sort by the most recent answer date, followed by ask_date_time
        questions.sort((q1, q2) => {
          // Get the latest answer date for q1
          const q1LatestDate =
            q1.answers.length > 0
              ? new Date(
                  Math.max(
                    ...q1.answers.map((ans) => ans.ans_date_time.getTime())
                  )
                )
              : q1.ask_date_time;

          // Get the latest answer date for q2
          const q2LatestDate =
            q2.answers.length > 0
              ? new Date(
                  Math.max(
                    ...q2.answers.map((ans) => ans.ans_date_time.getTime())
                  )
                )
              : q2.ask_date_time;

          console.log(
            `Comparing: q1=${q1._id} (Latest: ${q1LatestDate}) vs q2=${q2._id} (Latest: ${q2LatestDate})`
          );

          // Primary sort by the latest answer date
          if (q1LatestDate.getTime() !== q2LatestDate.getTime()) {
            return q2LatestDate.getTime() - q1LatestDate.getTime(); // Descending order
          }

          // Secondary sort by ask_date_time
          return q2.ask_date_time.getTime() - q1.ask_date_time.getTime(); // Descending order
        });
        break;
      case "unanswered": {
        questions = await Questions.find().exec();
        const unansweredQuestions = questions.filter(
          (question) => question.answers.length === 0
        );
        const answeredQuestions = questions.filter(
          (question) => question.answers.length > 0
        );
        for (let i = 0; i < unansweredQuestions.length - 1; i++) {
          for (let j = i + 1; j < unansweredQuestions.length; j++) {
            if (
              unansweredQuestions[i].ask_date_time <
              unansweredQuestions[j].ask_date_time
            ) {
              const temp = unansweredQuestions[i];
              unansweredQuestions[i] = unansweredQuestions[j];
              unansweredQuestions[j] = temp;
            }
          }
        }

        // Manually sort answeredQuestions by ask_date_time (descending)
        for (let i = 0; i < answeredQuestions.length - 1; i++) {
          for (let j = i + 1; j < answeredQuestions.length; j++) {
            if (
              answeredQuestions[i].ask_date_time <
              answeredQuestions[j].ask_date_time
            ) {
              const temp = answeredQuestions[i];
              answeredQuestions[i] = answeredQuestions[j];
              answeredQuestions[j] = temp;
            }
          }
        }

        // Combine unanswered and answered lists, with unanswered questions first
        questions = [...unansweredQuestions, ...answeredQuestions];
        break;
      }
      default:
        questions = [];
    }

    return questions;
  } catch (error) {
    console.error("Error retrieving questions:", error);
    return [];
  }
};

/**
 * A function to filter questions based on search string
 * @param qlist the list of questions to be filtered
 * @param search the filter string
 * @returns the filtered list of questions
 */
const filterQuestionsBySearch = (
  qlist: IQuestion[] | undefined,
  search: string
): IQuestion[] => {
  if (!qlist || search.trim() === "") return qlist || [];

  // Extract tags and keywords from the search string
  const tagRegex = /\[(.*?)\]/g; // Matches tags in brackets
  const tags = Array.from(search.matchAll(tagRegex)).map((match) =>
    match[1].trim()
  );
  const keywords = search
    .replace(tagRegex, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return qlist.filter((question) => {
    // Check if the question has at least one matching tag
    const hasMatchingTag =
      tags.length === 0 ||
      question.tags.some(
        (tag) => tags.includes(tag.name) // Check against the tag name
      );

    // Check if the question matches any of the keywords in title, text, or tags
    const hasMatchingKeyword =
      keywords.length === 0 ||
      keywords.some(
        (keyword) =>
          question.title.toLowerCase().includes(keyword.toLowerCase()) ||
          question.text.toLowerCase().includes(keyword.toLowerCase()) ||
          question.tags.some((tag) =>
            tag.name.toLowerCase().includes(keyword.toLowerCase())
          ) // Check tags for keywords
      );
    console.log("HasMatchingTag:", hasMatchingTag);
    console.log("HasMatchingKeyword:", hasMatchingKeyword);
    console.log("Question title:", question.title);
    console.log("Question tags:", question.tags);
    console.log("Question text:", question.text);

    return hasMatchingTag && hasMatchingKeyword; // Must match both criteria
  });
};

/**
 * Function that fetches a question by id and increments the views by 1
 * @param qid the question id
 * @returns a question object with the incremented views
 */
const fetchAndIncrementQuestionViewsById = async (
  qid: string
): Promise<ErrorWrapped<IQuestion | null>> => {
  if (!qid) {
    return { error: "Error when fetching and updating a question" };
  }

  try {
    const question = await Questions.findOneAndUpdate(
      { _id: qid },
      { $inc: { views: 1 } },
      { new: true }
    );
    return question;
  } catch (error) {
    console.error("Error fetching and incrementing question views:", error);
    return { error: "Error when fetching and updating a question" };
  }
};

/**
 * saves a question to the database
 * @param q question object to save
 * @returns the question object saved to the database
 * or an object with an error message if the save failed
 * @throws an error if the question is invalid
 */
const saveQuestion = async (q: IQuestion): Promise<ErrorWrapped<IQuestion>> => {
  try {
    // Validate and handle _id if it's present
    if (q._id && !mongoose.Types.ObjectId.isValid(q._id)) {
      console.warn(
        `Invalid _id found: ${q._id}. Removing it to let Mongoose generate a valid one.`
      );
      delete q._id; // Remove invalid _id to allow Mongoose to generate a new one
    }

    // Create a new question document
    const newQuestion = new Questions(q);

    // Save the question to the database
    const savedQuestion = await newQuestion.save();
    return savedQuestion;
  } catch (error) {
    console.error("Error saving question:", error);
    return { error: "Failed to save question. Please try again." };
  }
};

/**
 * saves an answer to the database
 * @param a answer object to save
 * @returns the answer object saved to the database
 * or an object with an error message if the save failed
 * @throws an error if the answer is invalid
 */
const saveAnswer = async (a: IAnswer): Promise<ErrorWrapped<IAnswer>> => {
  try {
    if (a._id && !mongoose.Types.ObjectId.isValid(a._id)) {
      console.warn(
        `Invalid _id found: ${a._id}. Removing it to let Mongoose generate a valid one.`
      );
      delete a._id; // Remove invalid _id to allow Mongoose to generate a new one
    }

    // Create a new answer document
    const newAnswer = new Answers(a);

    // Save the answer to the database
    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  } catch (error) {
    console.error("Error saving answer:", error);
    return { error: "Database error" };
  }
};

/**
 * retrieves tag ids from the database
 * @param tagNames a list of tag names
 * @returns returns a string array of tag ids
 * or empty array if the tag ids could not be retrieved
 */
const getTagIds = async (tagNames: string[]): Promise<string[]> => {
  const result: string[] = [];
  try {
    for (const tagName of tagNames) {
      // Find tag by name
      const tag = await Tags.findOne({ name: tagName });
      if (tag && tag._id) {
        result.push(tag._id);
      }
    }
  } catch (error) {
    console.error("Error retrieving tag IDs:", error);
  }

  return result;
};

/**
 * save an answer in the database, add the answer to the question, and update the question in the database
 * @param qid the question id
 * @param ans the answer object to be added
 * @returns the question object with the added answer or an object with an error message if the operation failed
 */
const addAnswerToQuestion = async (
  qid: string,
  ans: IAnswer
): Promise<ErrorWrapped<IQuestion | null>> => {
  try {
    const question = await Questions.findById(qid);
    if (!question) return null;

    const newAnswer = new Answers(ans); // Create a new answer instance
    await newAnswer.save();

    question.answers.push(newAnswer); // Add the answer to the question
    await question.save();

    return question;
  } catch (error) {
    console.error("Error adding answer to question:", error);
    return { error: "patabase error" };
  }
};

/**
 * save an comment in the database, add the comment to the answer, and update the answer in the database
 * @param aid the answer id
 * @param comment the comment object to be added
 * @returns the answer object with the added comment or an object with an error message if the operation failed
 */
const addCommentToAnswer = async (
    aid: string,
    comment: IComment
): Promise<ErrorWrapped<IAnswer | null>> => {
  try {
    const answer = await Answer.findById(aid);
    if (!answer || !answer.comments){
      return null;
    }

    const newComment = new Comments(comment); // Create a new answer instance
    await newComment.save();

    answer.comments.push(newComment); // Add the comment to the answer
    const newAnswer = await answer.save();

    return newAnswer;
  } catch (error) {
      console.error("Error adding comment to answer:", error);
      throw new Error("Database error");
  }
};

/**
 * retrieves the question count of each tag in the database
 * @returns a map where the key is the tag name and the value is the count of questions with that tag
 */
const getTagCountMap = async (): Promise<
  ErrorWrapped<Map<string, number> | null>
> => {
  try {
    const tagCountMap = new Map<string, number>();

    // Retrieve all questions and tags
    const questions = await Questions.find().exec();
    const tags = await Tags.find().exec();
    // Initialize the tag count map with zero counts for each tag
    for (const tag of tags) {
      tagCountMap.set(tag.name, 0); // Initialize counts to zero
    }
    if (questions === undefined) {
      return tagCountMap;
    }

    for (const question of questions) {
      if (Array.isArray(question.tags)) {
        // Ensure question.tags is an array
        for (const tag of question.tags) {
          const tagName = tag.name;

          // Increment the count for the tag in the map
          if (tagCountMap.has(tagName)) {
            tagCountMap.set(tagName, (tagCountMap.get(tagName) || 0) + 1);
          }
        }
      }
    }
    return tagCountMap; 
  } catch (error) {
    console.error("Error retrieving tag count map:", error);
    return { error: "Expected a Map but got an error:" }; // Return an error message
  }
};

const getUserByUsername = async (username: string): Promise<IUser | null> => {
  try {
    const user = await User.findOne({
      username: username,
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
};

export {
  getUserByUsername,
  insertNewUser,
  authenticateUser,
  logoutUser,
  addTag,
  getQuestionsByOrder,
  filterQuestionsBySearch,
  fetchAndIncrementQuestionViewsById,
  saveQuestion,
  getTagIds,
  saveAnswer,
  addAnswerToQuestion,
  addCommentToAnswer,
  getTagCountMap,
};

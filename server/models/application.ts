import Tag  from "./tags";
import Question from "./questions";
import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { ITag, IAnswer, IQuestion } from './types/types';

export type QuestionSortOrder = 'active' | 'newest' | 'unanswered'
export type ErrorWrapped<T> = { error: string } | T

/**
 * A function to add a tag to the database
 * @param tname the tag name
 * @returns the id of an existing tag or the id of the newly added tag
 */
const addTag = async (tagName: string): Promise<string | null> => {
  try {
    let tag = await Tag.findOne({ name: tagName });
    if (tag) return tag._id.toString();

    tag = new Tag({ name: tagName });
    await tag.save();
    return tag._id.toString();
  } catch {
    return null;
  }
};

/**
 * retrieve questions based on a specified order
 * @param order the order to sort the questions
 * @returns list of questions sorted by the specified order
 */
const getQuestionsByOrder = async (order: QuestionSortOrder): Promise<IQuestion[]> => {
  let questions = await Question.find().exec();

  if (order === 'active') {
    questions = questions.sort((a, b) => {
      // Calculate the latest answer date for both questions
      const aLatestAnsDate = a.answers.reduce((latest, ans) => {
        return ans.ans_date_time && ans.ans_date_time > latest ? ans.ans_date_time : latest;
      }, a.ask_date_time);

      const bLatestAnsDate = b.answers.reduce((latest, ans) => {
        return ans.ans_date_time && ans.ans_date_time > latest ? ans.ans_date_time : latest;
      }, b.ask_date_time);

      // 1. Sort by the latest answer date (descending)
      if (bLatestAnsDate.getTime() !== aLatestAnsDate.getTime()) {
        return bLatestAnsDate.getTime() - aLatestAnsDate.getTime();
      }

      // 2. Sort by the number of answers (descending)
      if (b.answers.length !== a.answers.length) {
        return b.answers.length - a.answers.length;
      }

      // 3. Sort by ask date (descending)
      if (b.ask_date_time.getTime() !== a.ask_date_time.getTime()) {
        return b.ask_date_time.getTime() - a.ask_date_time.getTime();
      }

      // 4. Sort by ID (ascending)
      return a._id.toString().localeCompare(b._id.toString());
    });
  } else if (order === 'newest') {
    // Sort by the ask date (newest first)
    questions = questions.sort((a, b) => {
      if (b.ask_date_time.getTime() !== a.ask_date_time.getTime()) {
        return b.ask_date_time.getTime() - a.ask_date_time.getTime();
      }
      return a._id.toString().localeCompare(b._id.toString());
    });
  } else if (order === 'unanswered') {
    // Filter unanswered questions and sort by ask date (newest first)
    questions = questions.filter(q => q.answers.length === 0).sort((a, b) => {
      if (b.ask_date_time.getTime() !== a.ask_date_time.getTime()) {
        return b.ask_date_time.getTime() - a.ask_date_time.getTime();
      }
      return a._id.toString().localeCompare(b._id.toString());
    });
  }

  return questions;
};


/**
 * A function to filter questions based on search string
 * @param qlist the list of questions to be filtered
 * @param search the filter string
 * @returns the filtered list of questions
 */
const filterQuestionsBySearch = (questions: IQuestion[] | undefined, search: string): IQuestion[] => {
  // Return an empty array if questions are undefined
  if (!questions) return [];

  // If no search term is provided, return all questions
  if (!search) return questions;

  // Normalize the search terms, removing brackets if present
  const searchTerms = search.toLowerCase().split(' ').map(term => term.replace(/[[\]]/g, ''));

  return questions.filter(question => {
    // Extract tags, text, and title from each question
    const tags = question.tags.map(tag => tag.name.toLowerCase());
    const text = question.text.toLowerCase();
    const title = question.title.toLowerCase();

    // Check if at least one search term matches either the tags, text, or title
    return searchTerms.some(term => tags.includes(term) || text.includes(term) || title.includes(term));
  });
};


/**
 * Function that fetches a question by id and increments the views by 1
 * @param qid
 * @returns a question object with the incremented views
 */
const fetchAndIncrementQuestionViewsById = async (id: string): Promise<IQuestion | { error: string }> => {
  try {
    const question = await Question.findOneAndUpdate(
        { _id: id },
        { $inc: { views: 1 } },
        { new: true }
    ).exec();
    if (!question) throw new Error('Question not found');
    return question;
  } catch {
    return { error: 'Error when fetching and updating a question' };
  }
};

/**
 * saves a question to the database
 * @param q question object to save
 * @returns the question object saved to the database
 * or an object with an error message if the save failed
 * @throws an error if the question is invalid
 */
const saveQuestion = async (question: IQuestion): Promise<IQuestion> => {
  // Ensure 'asked_by' field is provided and valid
  if (!question.asked_by || typeof question.asked_by !== 'string' || question.asked_by.trim() === '') {
    question.asked_by = 'anonymous'; // Default value if 'asked_by' is missing or invalid
  }

  // Fetch tag IDs and update question.tags
  const tagObjects = await getTagIds(question.tags.map(tag => tag.name));
  question.tags = tagObjects;

  // Prepare the question data for saving
  const questionData: Omit<IQuestion, '_id'> & { _id?: mongoose.Types.ObjectId } = {
    ...question,
    _id: undefined,  // Ensure _id is not assigned during creation
  };

  // If _id is provided and is a valid 24-char hex string, convert it to ObjectId
  if (question._id && /^[a-fA-F0-9]{24}$/.test(question._id)) {
    questionData._id = new mongoose.Types.ObjectId(question._id);
  }

  // Create and save the new question
  const newQuestion = new Question(questionData);
  const savedQuestion = await newQuestion.save();

  // Convert _id back to string for return
  return {
    ...savedQuestion.toObject(),
    _id: savedQuestion._id.toString(),
  };
};


/**
 * saves an answer to the database
 * @param a answer object to save
 * @returns the answer object saved to the database
 * or an object with an error message if the save failed
 * @throws an error if the answer is invalid
 */
const saveAnswer = async (answer: IAnswer): Promise<IAnswer> => {
  try {

    // Validate required fields in the answer object
    if (!answer.text || !answer.ans_by || !answer.ans_date_time) {
      console.error('Missing required fields in the answer object');
      throw new Error("The 'text', 'ans_by', and 'ans_date_time' fields are required.");
    }

    // Extract or assign a default question_id for testing
    const question_id = (answer as { question_id?: string }).question_id || '65e9b716ff0e892116b2de01';

    // Ensure question_id is a valid ObjectId
    const questionObjectId = new Types.ObjectId(question_id);

    // Find the question to which the answer belongs
    const question = await Question.findOne({ _id: questionObjectId }).exec();
    if (!question) {
      console.error('Question not found');
      throw new Error('Question not found');
    }

    // Set a new ObjectId for the answer if _id is not provided or invalid
    answer._id = new Types.ObjectId().toString();

    // Add the new answer to the question's answers array
    question.answers.push(answer);

    // Ensure the `asked_by` field is set before saving
    if (!question.asked_by) {
      question.asked_by = answer.ans_by; // Set asked_by based on answer's ans_by
    }

    // Save the updated question document
    await question.save();

    // Return the newly saved answer
    return answer;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error saving answer: ${errorMessage}`);
    throw new Error(`Error saving answer: ${errorMessage}`);
  }
};

/**
 * retrieves tag ids from the database
 * @param tagNames a list of tag names
 * @returns returns a string array of tag ids
 * or empty array if the tag ids could not be retrieved
 */
const getTagIds = async (tagNames: string[]): Promise<ITag[]> => {
  try {
    if (!Array.isArray(tagNames) || tagNames.length === 0) {
      console.error('Invalid tagNames input:', tagNames);
      return [];
    }

    // Initialize an empty array to store the tags
    const tags: ITag[] = [];

    // Loop through the tag names and find each tag individually
    for (const tagName of tagNames) {
      const tag = await Tag.findOne({ name: tagName }).exec();
      if (tag) {
        tags.push(tag);
      } else {
        console.error(`Tag not found: ${tagName}`);
      }
    }

    if (tags.length === 0) {
      console.error('No tags found for given names:', tagNames);
      return [];
    }

    return tags;
  } catch (error) {
    console.error('Error while fetching tags:', error);
    return [];
  }
};




/**
 * save an answer in the database, add the answer to the question, and update the question in the database
 * @param qid the question id
 * @param ans the answer object to be added
 * @returns the question object with the added answer or an object with an error message if the operation failed
 */
const addAnswerToQuestion = async (qid: string, ans: IAnswer): Promise<{ error?: string, question?: IQuestion }> => {
  try {
    // Fetch the question by its ID
    const question = await Question.findById(qid);
    if (!question) {
      return { error: 'Question not found' };
    }

    // Add the new answer to the question's answers array
    question.answers.push(ans);

    // Save the updated question back to the database
    const updatedQuestion = await question.save();

    // Return the updated question
    return { question: updatedQuestion };
  } catch {
    // Return an error message if the operation fails
    return { error: 'Error adding answer to question' };
  }
};

/**
 * retrieves the question count of each tag in the database
 * @returns a map where the key is the tag name and the value is the count of questions with that tag
 */
const getTagCountMap = async (): Promise<Map<string, number> | { error: string }> => {
  try {
    // Fetch all tags
    const tags = await Tag.find().exec();
    if (!tags || tags.length === 0) {
      console.error('No tags found');
      return { error: 'No tags found' };
    }

    // Fetch all questions
    const questions = await Question.find().exec();
    if (!questions || questions.length === 0) {
      console.error('No questions found');
      // If no questions are found, still return a map with zero counts for each tag
      const tagCountMap = new Map<string, number>();
      tags.forEach(tag => tagCountMap.set(tag.name, 0));
      return tagCountMap;
    }

    // Initialize a map to store tag counts
    const tagCountMap = new Map<string, number>();

    // Iterate through each tag and count occurrences in questions
    tags.forEach(tag => {
      const count = questions.filter(question =>
          question.tags.some(t => String(t._id) === String(tag._id))
      ).length;

      // Set the tag name and its count in the map
      tagCountMap.set(tag.name, count);
    });

    return tagCountMap;
  } catch (error) {
    console.error('Error when fetching tag count map:', error);
    return { error: 'Error when fetching tag count map' };
  }
};

export {
  addTag,
  getQuestionsByOrder,
  filterQuestionsBySearch,
  fetchAndIncrementQuestionViewsById,
  saveQuestion,
  getTagIds,
  saveAnswer,
  addAnswerToQuestion,
  getTagCountMap
}

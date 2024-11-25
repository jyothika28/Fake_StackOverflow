import { REACT_APP_API_URL, api } from "./config";
import { QuestionType, QuestionResponseType } from "../types/entityTypes";

const QUESTION_API_URL = `${REACT_APP_API_URL}/question`;

// Function to get questions by filter
const getQuestionsByFilter = async (
  order = "newest",
  search = ""
): Promise<QuestionResponseType[]> => {
  try {
    const res = await api.get(
      `${QUESTION_API_URL}/getQuestion?order=${order}&search=${search}`
    );
    if (res.status !== 200) {
      throw new Error("Error when fetching or filtering questions");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Function to get question by id
const getQuestionById = async (qid: string): Promise<QuestionResponseType> => {
  try {
    const res = await api.get(`${QUESTION_API_URL}/getQuestionById/${qid}`);
    if (res.status !== 200) {
      throw new Error("Error when fetching question by id");
    }
    return res.data;
  } catch (error) {
    console.error(`Error fetching question ${qid}:`, error);
    throw error;
  }
};

// Function to add a question
const addQuestion = async (q: QuestionType): Promise<QuestionResponseType> => {
  try {
    const res = await api.post(`${QUESTION_API_URL}/addQuestion`, q);
    if (res.status !== 200) {
      throw new Error("Error while creating a new question");
    }

    return res.data;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

export { getQuestionsByFilter, getQuestionById, addQuestion };

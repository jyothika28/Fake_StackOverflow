import { REACT_APP_API_URL, api } from "./config";
import { AnswerType, AnswerResponseType } from "../types/entityTypes";

const ANSWER_API_URL = `${REACT_APP_API_URL}/answer`;
const COMMENT_API_URL = `${REACT_APP_API_URL}/comment`;

// Function to add an answer
const addAnswer = async (
  qid: string,
  ans: AnswerType
): Promise<AnswerResponseType> => {
  const data = { qid: qid, ans: ans };
  try {
    const res = await api.post(`${ANSWER_API_URL}/addAnswer`, data);
    if (res.status !== 200) {
      throw new Error("Error while creating a new answer");
    }
    return res.data;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw error;
  }
};

const addComment = async (
    answerId: string,
    comment: { text: string; commented_by: string }
) => {
  try {
    const res = await api.post(`${COMMENT_API_URL}/answer/${answerId}/comment`, comment);
    if (res.status !== 200) {
      throw new Error("Error while creating a new comment");
    }
    return res.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};



export { addAnswer, addComment };

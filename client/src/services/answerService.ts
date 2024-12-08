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
    console.log("New comment in UI:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

const flagAnswer = async (
    questionId: string,
    answerId: string
): Promise<AnswerResponseType> => {
  const data = { questionId: questionId };


  try {
    const response = await api.post(`${ANSWER_API_URL}/flagAnswer/${answerId}`, data);
    if (response.status !== 200) {
      throw new Error("Error while flagging an answer");
    }
    return response.data;
  } catch (error) {
    console.error("Error flagging answer:", error);
    throw error;
  }
};

const voteAnswer = async (
    questionId: string,
    answerId: string,
    voteType: "upvote" | "downvote"
) => {
  try {
    console.log("answerService: Voting on answer:", { questionId, answerId, voteType });
    const response = await api.post(`${ANSWER_API_URL}/${answerId}/vote`, {
      questionId, vote: voteType,
    });
    console.log("answerService: Vote response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error voting on answer:", error);
    throw error;
  }
};


export { addAnswer, addComment, flagAnswer, voteAnswer };

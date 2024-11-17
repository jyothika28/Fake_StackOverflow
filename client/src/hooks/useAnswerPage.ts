import { useEffect, useState } from "react";
import { getQuestionById } from "../services/questionService";
import { QuestionResponseType } from "../types/entityTypes";

export const useAnswerPage = (qid: string) => {
  const [question, setQuestion] = useState<QuestionResponseType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionById(qid);
        setQuestion(res || null);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchData();
  }, [qid]);

  return { question };
};

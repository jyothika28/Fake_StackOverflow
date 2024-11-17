import { useState } from "react";
import { validateHyperlink } from "../tool";
import { addAnswer } from "../services/answerService";
import { QuestionIdFunctionType } from "../types/functionTypes";

export const useNewAnswer = (
  qid: string,
  handleAnswer: QuestionIdFunctionType
) => {
  const [usrn, setUsrn] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [usrnErr, setUsrnErr] = useState<string>("");
  const [textErr, setTextErr] = useState<string>("");

  const postAnswer = async () => {
    let isValid = true;

    if (!usrn) {
      setUsrnErr("Username cannot be empty");
      isValid = false;
    }

    if (!text) {
      setTextErr("Answer text cannot be empty");
      isValid = false;
    }

    // Hyperlink validation
    if (!validateHyperlink(text)) {
      setTextErr("Invalid hyperlink format.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const answer = {
      text: text,
      ans_by: usrn,
      ans_date_time: new Date(),
    };

    const res = await addAnswer(qid, answer);
    if (res && res._id) {
      handleAnswer(qid);
    }
  };

  return {
    usrn,
    setUsrn,
    text,
    setText,
    usrnErr,
    textErr,
    postAnswer,
  };
};

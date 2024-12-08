import { useState } from "react";
import { validateHyperlink } from "../tool";
import { addQuestion } from "../services/questionService";
import { VoidFunctionType } from "../types/functionTypes";

export const useNewQuestion = (handleQuestions: VoidFunctionType) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [usrn, setUsrn] = useState<string>("");

  const [titleErr, setTitleErr] = useState<string>("");
  const [textErr, setTextErr] = useState<string>("");
  const [tagErr, setTagErr] = useState<string>("");
  const [usrnErr, setUsrnErr] = useState<string>("");

  const postQuestion = async () => {
    let isValid = true;

    if (!title) {
      setTitleErr("Title cannot be empty");
      isValid = false;
    } else if (title.length > 100) {
      setTitleErr("Title cannot be more than 100 characters");
      isValid = false;
    }

    if (!text) {
      setTextErr("Question text cannot be empty");
      isValid = false;
    }

    // Hyperlink validation
    if (!validateHyperlink(text)) {
      setTextErr("Invalid hyperlink format.");
      isValid = false;
    }

    const tags = tag.split(" ").filter((tag) => tag.trim() !== "");
    if (tags.length === 0) {
      setTagErr("Should have at least 1 tag");
      isValid = false;
    } else if (tags.length > 5) {
      setTagErr("Cannot have more than 5 tags");
      isValid = false;
    }

    for (const tag of tags) {
      if (tag.length > 20) {
        setTagErr("New tag length cannot be more than 20");
        isValid = false;
        break;
      }
    }

    const tagObjects = tags.map((tag) => ({ name: tag }));

    if (!usrn) {
      setUsrnErr("Username cannot be empty");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const question = {
      title: title,
      text: text,
      tags: tagObjects,
      asked_by: usrn,
      ask_date_time: new Date(),
      views: 0,
      upvotes: 0,
      downvotes: 0,
      flagged: false,
    };

    const res = await addQuestion(question);
    if (res && res._id) {
      handleQuestions();
    }
  };

  return {
    title,
    setTitle,
    text,
    setText,
    tag,
    setTag,
    usrn,
    setUsrn,
    titleErr,
    textErr,
    tagErr,
    usrnErr,
    postQuestion,
  };
};

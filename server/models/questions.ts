import mongoose from "mongoose";
import { IQuestion } from "./types/types";
import QuestionSchema from "./schema/question";

// Create a model for the questions based on QuestionSchema
const Question = mongoose.model<IQuestion>("Question", QuestionSchema);

const flagQuestionById = async (questionId: string) => {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");
    question.flagged = true;
    await question.save();
    return question;
};

export { flagQuestionById };
export default Question;

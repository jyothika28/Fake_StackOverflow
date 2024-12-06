import mongoose from "mongoose";
import { IQuestion } from "./types/types";
import QuestionSchema from "./schema/question";

// Create a model for the questions based on QuestionSchema
const Question = mongoose.model<IQuestion>("Question", QuestionSchema);

const flagQuestionById = async (questionId: string) => {
    console.log("flagQuestionById called with ID:", questionId);

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        console.error("Invalid question ID");
        throw new Error("Invalid question ID");
    }

    const question = await Question.findById(questionId);
    if (!question) {
        console.error("Question not found");
        throw new Error("Question not found");
    }

    console.log("Question found:", question);

    question.flagged = true;
    await question.save();

    console.log("Question flagged and saved:", question);
    return question;
};

export { flagQuestionById };
export default Question;

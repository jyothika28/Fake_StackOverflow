import mongoose from "mongoose";
import { IAnswer } from "./types/types";
import AnswerSchema from "./schema/answer";

// Create a model for the answers based on AnswerSchema
const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

const flagAnswerById = async (answerId: string): Promise<IAnswer | null> => {
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");
    answer.flagged = true;
    await answer.save();
    return answer;
};

export { flagAnswerById };

export default Answer;

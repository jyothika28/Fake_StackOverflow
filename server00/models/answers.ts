import mongoose from "mongoose";
import { IAnswer } from "./types/types";
import AnswerSchema from "./schema/answer";

// Create a model for the answers based on AnswerSchema
const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

export default Answer;

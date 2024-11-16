import mongoose from 'mongoose'
import { IQuestion } from './types/types'
import questionSchema from "./schema/question";

// Create a model for the questions based on QuestionSchema
const Question = mongoose.model<IQuestion>('Question', questionSchema)

export default Question

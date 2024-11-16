import mongoose from 'mongoose'
import { IAnswer } from './types/types'
import answerSchema from './schema/answer'

// Create a model for the answers based on AnswerSchema
const Answer = mongoose.model<IAnswer>('Answer', answerSchema)

export default Answer

import { Schema } from 'mongoose';
import { IAnswer } from '../types/types';

const answerSchema = new Schema<IAnswer>({
    text: { type: String, required: true },
    ans_by: { type: String, required: true },
    ans_date_time: { type: Date, required: true }
});

export default answerSchema;
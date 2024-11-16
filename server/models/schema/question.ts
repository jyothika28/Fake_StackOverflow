import { Schema } from 'mongoose';
import { IQuestion } from '../types/types';

const questionSchema = new Schema<IQuestion>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    asked_by: { type: String, required: true },
    ask_date_time: { type: Date, required: true },
    views: { type: Number, default: 0 }
});

export default questionSchema;
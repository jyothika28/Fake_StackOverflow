import { Schema } from 'mongoose';
import { ITag } from '../types/types';

const tagSchema = new Schema<ITag>({
    name: { type: String, required: true }
});

export default tagSchema;
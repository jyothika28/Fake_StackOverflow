import mongoose from 'mongoose'
import { ITag } from './types/types'
import tagSchema from './schema/tag'

// Create a model for the tags based on TagSchema
const Tag = mongoose.model<ITag>('Tag', tagSchema)

export default Tag

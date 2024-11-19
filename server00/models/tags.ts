import mongoose from "mongoose";
import { ITag } from "./types/types";
import TagSchema from "./schema/tag";

// Create a model for the tags based on TagSchema
const Tag = mongoose.model<ITag>("Tag", TagSchema);

export default Tag;

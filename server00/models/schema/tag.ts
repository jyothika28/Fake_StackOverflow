import mongoose from "mongoose";

// Define Mongoose Schema for tags
const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { collection: "Tag" }
);

export default TagSchema;

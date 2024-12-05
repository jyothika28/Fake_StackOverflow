import mongoose from "mongoose";
import CommentSchema from "./comment";

// Define Mongoose Schema for answers
const AnswerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    ans_by: {
      type: String,
      required: true,
    },
    ans_date_time: {
      type: Date,
      default: Date.now,
    },
      comments: [CommentSchema], // Array of comments
      upvotes: {
          type: Number,
          default: 0,
      },
      downvotes: {
          type: Number,
          default: 0,
      },
    flagged: {
          type: Boolean,
          default: false, // New field for flagged answers
      },
  },
  { collection: "Answer" }
);

export default AnswerSchema;

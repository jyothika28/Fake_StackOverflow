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
      comments: {
          type: [CommentSchema],
          default: [], // Ensures comments is always an array
      },
      votes: {
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

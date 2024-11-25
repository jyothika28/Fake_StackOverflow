import mongoose from "mongoose";

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
    upvote: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Answer" }
);

export default AnswerSchema;

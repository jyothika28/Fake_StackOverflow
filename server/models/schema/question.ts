import mongoose from "mongoose";
import AnswerSchema from "./answer";
import TagSchema from "./tag";
// Define Mongoose Schema for questions
const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    asked_by: {
      type: String,
      required: true,
    },
    ask_date_time: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    answers: [AnswerSchema],
    tags: [TagSchema],
    votes: { type: Number, default: 0 },
    flagged: { type: Boolean, default: false },
  },
  { collection: "Question" }
);

export default QuestionSchema;

import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        commented_by: {
            type: String,
            required: true,
        },
        comment_date_time: {
            type: Date,
            default: Date.now,
        },
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0,
        },
        replies: [this],
        flagged: {
            type: Boolean,
            default: false,
        },
    },
    { collection: "Comment" }
);

export default CommentSchema;

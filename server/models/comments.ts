import mongoose from "mongoose";
import { IComment } from "./types/types";
import CommentSchema from "./schema/comment";

// Create a model for the answers based on AnswerSchema
const Comment = mongoose.model<IComment>("Answer", CommentSchema);

/**
 * Flags an answer by its ID.
 * @param {string} answerId - The ID of the answer to flag.
 * @returns {Promise<IAnswer | null>} - The updated answer document or null if not found.
 * @throws {Error} - Throws an error if the answer is not found or a database error occurs.
 */
const flagCommentById = async (answerId: string): Promise<IComment | null> => {
    try {
        const comment = await Comment.findById(answerId);
        if (!comment) {
            console.warn(`Answer with ID ${answerId} not found`);
            throw new Error("Answer not found");
        }
        comment.flagged = true;
        const newComment = await comment.save();
        return newComment;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error in flagAnswerById: ${error.message}`);
        } else {
            console.error("Unexpected error in flagAnswerById:", error);
        }
        throw error; // Re-throw the error to be handled by the caller
    }
};

export { flagCommentById };

export default Comment;

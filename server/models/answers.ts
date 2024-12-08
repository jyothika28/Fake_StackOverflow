import mongoose from "mongoose";
import { IAnswer } from "./types/types";
import AnswerSchema from "./schema/answer";

// Create a model for the answers based on AnswerSchema
const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

/**
 * Flags an answer by its ID.
 * @param {string} answerId - The ID of the answer to flag.
 * @returns {Promise<IAnswer | null>} - The updated answer document or null if not found.
 * @throws {Error} - Throws an error if the answer is not found or a database error occurs.
 */
const flagAnswerById = async (answerId: string): Promise<IAnswer | null> => {
    try {
        const answer = await Answer.findById(answerId);
        if (!answer) {
            console.warn(`Answer with ID ${answerId} not found`);
            throw new Error("Answer not found");
        }
        answer.flagged = true;
        const newAnswer = await answer.save();
        return newAnswer;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error in flagAnswerById: ${error.message}`);
        } else {
            console.error("Unexpected error in flagAnswerById:", error);
        }
        throw error; // Re-throw the error to be handled by the caller
    }
};

export { flagAnswerById };

export default Answer;

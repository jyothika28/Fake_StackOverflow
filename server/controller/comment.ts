import express from "express";
import Answer from "../models/answers";
import {
    IComment,
    AddCommentRequest,
    GetCommentRequest,
    GetCommentsRequest
} from "../models/types/types";
import {addAnswerToQuestion, addCommentToAnswer, saveComment} from "../models/application";

const router = express.Router();

/**
 * POST /answer/:answerId/comment
 * Adds a comment to an answer.
 */
router.post("/answer/:answerId/comment", async (req: AddCommentRequest, res) => {
    try {
        const { answerId } = req.params;
        const { text, commented_by } = req.body;
        console.log("Incoming request body:", req.body);
        console.log("Incoming request params:", req.params);

        console.log("Incoming request:", req.body);
        if (!text || !commented_by) {
            return res.status(400).json({ error: "Invalid comment body" });
        }

        const comment: IComment = {
            text,
            commented_by,
            comment_date_time: new Date(),
            upvotes: 0,
            downvotes: 0,
        };

        console.log("Adding comment:", comment);

        const newComment = await saveComment(comment);
        if (newComment instanceof Error) {
            console.error("Error saving answer:", newComment);
            return res.status(500).json({ error: "Database error" });
        }

        // Attempt to add answer to the corresponding question
        const updatedComment = await addCommentToAnswer(answerId, comment);
        // Check if there was an error updating the question
        // Here we check if updatedQuestion contains an error message
        if (updatedComment === undefined) {
            return res.status(500).json({ error: "Database error" });
        }

        res.status(200).json({ message: "Comment added successfully", comment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Error adding comment" });
    }
});

router.get("/answer/:answerId/comments", async (req: GetCommentsRequest, res) => {
    try {
        const { answerId } = req.params;

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        res.status(200).json({ comments: answer.comments || [] });
    } catch (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).json({ error: "Error retrieving comments" });
    }
});

router.post("/answer/:answerId/comment/:commentId/flagComment", async (req: GetCommentRequest, res) => {
    try {
        const { answerId, commentId } = req.params;

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        const comment = answer.comments?.find((c) => c._id?.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        comment.flagged = true;
        await answer.save();

        res.status(200).json({ message: "Comment flagged for moderation", comment });
    } catch (error) {
        console.error("Error reporting comment:", error);
        res.status(500).json({ error: "Error reporting comment" });
    }
});


export default router;
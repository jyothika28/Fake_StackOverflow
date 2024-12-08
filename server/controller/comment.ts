import express from "express";
import Answer from "../models/answers";
import {
    IComment,
    AddCommentRequest,
    GetCommentRequest,
    GetCommentsRequest
} from "../models/types/types";

const router = express.Router();

/**
 * POST /answer/:answerId/comment
 * Adds a comment to an answer.
 */
router.post("/answer/:answerId/comment", async (req: AddCommentRequest, res) => {
    try {
        const { answerId } = req.params;
        const { text, commented_by } = req.body;

        console.log("Incoming request:", req.body);
        if (!text || !commented_by) {
            return res.status(400).json({ error: "Invalid comment body" });
        }

        const answer = await Answer.findById(answerId);
        console.log("Found answer:", answer);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        if (!answer.comments) {
            answer.comments = [];
        }

        const comment: IComment = {
            text,
            commented_by,
            comment_date_time: new Date(),
            upvotes: 0,
            downvotes: 0,
        };

        answer.comments.push(comment);
        await answer.save();


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

        res.status(200).json({ comments: answer.comments });
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
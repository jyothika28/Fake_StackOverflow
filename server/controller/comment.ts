import express from "express";
import Answer from "../models/answers";
import {
    IComment,
    AddCommentRequest,
    GetCommentRequest,
    DeleteCommentRequest,
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
            replies: [],
        };

        answer.comments.push(comment);
        await answer.save();


        res.status(200).json({ message: "Comment added successfully", comment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Error adding comment" });
    }
});

/**
 * POST /answer/:answerId/comment/:commentId/reply
 * Adds a reply to a comment.
 */
router.post("/answer/:answerId/comment/:commentId/reply", async (req: GetCommentRequest, res) => {
    try {
        const { answerId, commentId } = req.params;
        const { text, commented_by } = req.body;

        if (!text || !commented_by) {
            return res.status(400).json({ error: "Invalid reply body" });
        }

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        // Ensure comments array is accessible
        if (!answer.comments || answer.comments.length === 0) {
            return res.status(404).json({ error: "No comments found for this answer" });
        }
        console.log("Answers string:", answer);
        const comment = answer.comments?.find((c) => c._id?.toString() === commentId);
        console.log("Comments string:", comment);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const reply = {
            text,
            commented_by,
            comment_date_time: new Date(),
            upvotes: 0,
            downvotes: 0,
            replies: [],
        };

        comment.replies.push(reply);
        await answer.save();

        res.status(200).json({ message: "Reply added successfully", reply });
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ error: "Error adding reply" });
    }
});

router.put("/answer/:answerId/comment/:commentId", async (req: GetCommentRequest, res) => {
    try {
        const { answerId, commentId } = req.params;
        const { text, commented_by } = req.body;

        if (!text || !commented_by) {
            return res.status(400).json({ error: "Invalid comment body" });
        }

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        const comment = answer.comments?.find((c) => c._id?.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.commented_by !== commented_by) {
            return res.status(403).json({ error: "Unauthorized to edit this comment" });
        }

        comment.text = text;
        await answer.save();

        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Error updating comment" });
    }
});

router.delete("/answer/:answerId/comment/:commentId", async (req: DeleteCommentRequest, res) => {
    try {
        const { answerId, commentId } = req.params;
        const { commented_by } = req.body;

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        const comment = answer.comments?.find((c) => c._id?.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.commented_by !== commented_by) {
            return res.status(403).json({ error: "Unauthorized to delete this comment" });
        }

        const commentIndex = answer.comments?.findIndex((c) => c._id?.toString() === commentId);

        if (!answer.comments || commentIndex === undefined || commentIndex === -1) {
            return res.status(404).json({ error: "Comment not found" });
        }

// Remove the comment from the array
        answer.comments.splice(commentIndex, 1);

        await answer.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Error deleting comment" });
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

router.post("/answer/:answerId/comment/:commentId/report", async (req: GetCommentRequest, res) => {
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
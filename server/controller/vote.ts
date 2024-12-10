import express from "express";
import Answer from "../models/answers";

const router = express.Router();

/**
 * POST /answer/:answerId/vote
 * Upvote or downvote an answer.
 */
router.post("/answer/:answerId/vote", async (req, res) => {
    try {
        const { answerId } = req.params;
        const { vote } = req.body; // "upvote" or "downvote"

        if (!["upvote", "downvote"].includes(vote)) {
            return res.status(400).json({ error: "Invalid vote action" });
        }

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        // Ensure votes are initialized
        answer.votes = answer.votes || 0;

        if (vote === "upvote") {
            answer.votes++;
        } else if (vote === "downvote") {
            answer.votes--;
        }

        await answer.save();

        res.status(200).json({ message: `Answer ${vote}d successfully`, answer });
    } catch (error) {
        console.error("Error voting on answer:", error);
        res.status(500).json({ error: "Error voting on answer" });
    }
});


/**
 * POST /answer/:answerId/comment/:commentId/vote
 * Upvote or downvote a comment on an answer.
 */
router.post("/answer/:answerId/comment/:commentId/vote", async (req, res) => {
    try {
        const { answerId, commentId } = req.params;
        const { vote } = req.body; // "upvote" or "downvote"

        if (!["upvote", "downvote"].includes(vote)) {
            return res.status(400).json({ error: "Invalid vote action" });
        }

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        const comment = answer.comments?.find((c) => c._id?.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (vote === "upvote") {
            comment.votes++;
        } else if (vote === "downvote") {
            comment.votes--;
        }

        await answer.save();

        res.status(200).json({ message: `Comment ${vote}d successfully`, comment });
    } catch (error) {
        console.error("Error voting on comment:", error);
        res.status(500).json({ error: "Error voting on comment" });
    }
});

export default router;
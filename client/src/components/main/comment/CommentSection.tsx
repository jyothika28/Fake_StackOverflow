import React, { useEffect, useState } from "react";
import CommentForm from "./commentFormView";
import { addComment } from "../../../services/answerService";
import { getCommentsForAnswer } from "../../../services/commentService";
import Button from "@mui/material/Button";
import FlagIcon from "@mui/icons-material/Flag";
import {CommentType} from "../../../types/entityTypes";

interface CommentSectionProps {
    answerId: string; // ID of the associated answer
    comments: CommentType[]; // Initial list of comments
    onFlag: (answerId: string, commentId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
                                                           answerId,
                                                           comments: initialComments,
                                                           onFlag,
                                                       }) => {
    const [comments, setComments] = useState<CommentType[]>(initialComments);

    // Fetch comments when the component loads
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedComments = await getCommentsForAnswer(answerId);
                setComments(fetchedComments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [answerId]);

    const handleAddComment = async (text: string, commentedBy: string) => {
        try {
            if (!text || !commentedBy) {
                console.error("Comment text or username is missing.");
                return;
            }

            const response = await addComment(answerId, { text, commented_by: commentedBy });

            if (response.comment) {
                console.log("New comment inside handleAddComment:", response.comment);

                // Add the new comment to the comments state
                setComments((prevComments) => [...prevComments, response.comment]);
            } else {
                console.error("Invalid response from server:", response);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleFlag = async (commentId: string) => {
        console.log("handleFlag: Flagging comment:", commentId);
        const updatedComments = comments.map((comment) => {
            if (comment._id === commentId) {
                console.log("handleFlag: Found comment:", commentId);
                return { ...comment, flagged: true }; // Set flagged to true and prevent toggling
            }
            console.log("handleFlag: Comment not found:", commentId);
            return comment;
        });
        console.log("handleFlag: Updated comments:", updatedComments);
        setComments(updatedComments);
        console.log("handleFlag: Updated comments:", comments);

        try {
            console.log(`onFlag: Flagging comment ${commentId} for answer ${answerId}`);
            await onFlag(answerId, commentId); // Call the flagging function
            console.log(`Comment ${commentId} flagged successfully.`);
        } catch (error) {
            console.error("Error flagging comment:", error);
        }
    };

    return (
        <div className="commentSection">
            <h3>Comments</h3>
            <CommentForm onSubmit={handleAddComment} />
            {comments.length > 0 ? (
                <div className="commentList">
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            <p>
                                <strong>{comment.commented_by || "Anonymous"}:</strong>{" "}
                                {comment.text || "No content"}
                            </p>
                            <Button
                                variant="text"
                                startIcon={<FlagIcon />}
                                onClick={() => handleFlag(comment._id)}
                                disabled={comment.flagged} // Disable button if already flagged
                                style={{
                                    color: comment.flagged ? "red" : "gray", // Red for flagged, gray otherwise
                                }}
                            >
                                {comment.flagged ? "Flagged" : "Flag"}
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default CommentSection;

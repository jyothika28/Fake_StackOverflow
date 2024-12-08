import React, { useState } from "react";
import CommentForm from "./commentFormView";
import { addComment } from "../../../services/answerService";

interface Comment {
    _id: string;
    text: string;
    commented_by: string;
}

interface CommentSectionProps {
    answerId: string; // ID of the associated answer
    comments: Comment[]; // Initial list of comments
}

const CommentSection: React.FC<CommentSectionProps> = ({
                                                           answerId,
                                                           comments: initialComments,
                                                       }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);

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

                console.log("Current Comments inside handleAddComment:", comments);
            } else {
                console.error("Invalid response from server:", response);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
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

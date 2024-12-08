import React, { useState } from "react";
import CommentForm from "./commentFormView";
import { addComment } from "../../../services/answerService";

interface Comment {
    _id: string;
    text: string;
    commented_by: string;
}

interface CommentSectionProps {
    answerId: string;
    comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({
                                                           answerId,
                                                           comments: initialComments,
                                                       }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);

    const handleAddComment = async (text: string, commentedBy: string) => {
        try {
            const newComment = await addComment(answerId, { text, commented_by: commentedBy });
            setComments([...comments, newComment]);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="commentSection">
            <h3>Comments</h3>
            <CommentForm onSubmit={handleAddComment} />
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <p>
                            <strong>{comment.commented_by}:</strong> {comment.text}
                        </p>
                    </div>
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default CommentSection;

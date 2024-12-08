import React from "react";
import CommentForm from "./commentFormView";

interface Comment {
    _id: string;
    text: string;
    commented_by: string;
}

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment._id} className="comment">
                    <p>
                        <strong>{comment.commented_by}:</strong> {comment.text}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;

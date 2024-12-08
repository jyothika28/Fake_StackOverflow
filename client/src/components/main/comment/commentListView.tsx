import React from "react";
import CommentForm from "./commentFormView";

interface Comment {
    _id: string;
    text: string;
    commented_by: string;
    replies: Comment[];
}

interface CommentListProps {
    comments: Comment[];
    onReply: (commentId: string, replyText: string, repliedBy: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onReply }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment._id} className="comment">
                    <p>
                        <strong>{comment.commented_by}:</strong> {comment.text}
                    </p>
                    <CommentForm
                        buttonText="Post Reply"
                        onSubmit={(text, commentedBy) =>
                            onReply(comment._id, text, commentedBy)
                        }
                    />
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="replies">
                            <CommentList comments={comment.replies} onReply={onReply} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;

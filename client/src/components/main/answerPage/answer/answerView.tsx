import { handleHyperlink } from "../../../../tool";
import "./answerView.css";
import CommentForm from "../../comment/commentFormView";
import { useState } from "react";
import { addComment, addReply } from "../../../../services/answerService";

interface Comment {
    _id: string;
    text: string;
    commented_by: string;
    replies?: Comment[];
}

interface AnswerProps {
    text: string;
    ansBy: string;
    meta: string;
    answerId: string;
    comments?: Comment[]; // Allow comments to be optional
}

const Answer = ({ text, ansBy, meta, answerId, comments: initialComments = [] }: AnswerProps) => {
    const [comments, setComments] = useState<Comment[]>(initialComments || []);

    // Add a new comment to the answer
    const handleAddComment = async (text: string, commentedBy: string) => {
        try {
            const newComment = await addComment(answerId, { text, commented_by: commentedBy });
            setComments((prev) => [...prev, newComment]);
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment. Please try again.");
        }
    };

    // Add a reply to an existing comment
    const handleAddReply = async (commentId: string, text: string, commentedBy: string) => {
        if (!commentId) {
            console.error("Comment ID is undefined.");
            return;
        }
        try {
            const updatedReply = await addReply(answerId, commentId, { text, commented_by: commentedBy });
            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === commentId
                        ? { ...comment, replies: [...(comment.replies || []), updatedReply] }
                        : comment
                )
            );
        } catch (error) {
            console.error("Error adding reply:", error);
            alert("Failed to add reply. Please try again.");
        }
    };

    return (
        <div className="answer right_padding">
            <div id="answerText" className="answerText">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor">
                <div className="answer_author">{ansBy}</div>
                <div className="answer_question_meta">{meta}</div>
            </div>
            <CommentForm
                onSubmit={(text, commentedBy) => handleAddComment(text, commentedBy)}
                buttonText="Post Comment"
            />
            <div className="commentSection">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            <p>
                                <strong>{comment.commented_by}:</strong> {comment.text}
                            </p>
                            <CommentForm
                                onSubmit={(text, commentedBy) => handleAddReply(comment._id, text, commentedBy)}
                                buttonText="Reply"
                            />
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="replies">
                                    {comment.replies.map((reply) => (
                                        <div key={reply._id} className="reply">
                                            <p>
                                                <strong>{reply.commented_by}:</strong> {reply.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="noCommentsText">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default Answer;

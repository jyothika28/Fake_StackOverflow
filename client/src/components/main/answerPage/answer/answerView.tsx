import { handleHyperlink } from "../../../../tool";
import "./answerView.css";
import CommentForm from "../../comment/commentFormView";
import { useState } from "react";
import { addComment, addReply } from "../../../../services/answerService";

interface Comment {
    _id: string;
    text: string;
    commented_by: string;
    replies: Comment[];
}

interface AnswerProps {
    text: string;
    ansBy: string;
    meta: string;
    answerId: string;
    comments: Comment[];
}

const Answer = ({ text, ansBy, meta, answerId, comments: initialComments }: AnswerProps) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);

    const handleAddComment = async (text: string, commentedBy: string) => {
        try {
            const newComment = await addComment(answerId, { text, commented_by: commentedBy });
            setComments([...comments, newComment]);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleAddReply = async (commentId: string, text: string, commentedBy: string) => {
        try {
            const updatedComment = await addReply(commentId, { text, commented_by: commentedBy });
            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === commentId ? { ...comment, replies: [...comment.replies, updatedComment] } : comment
                )
            );
        } catch (error) {
            console.error("Error adding reply:", error);
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
            <CommentForm onSubmit={handleAddComment} />
            <div className="commentSection">
                {comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <p>
                            <strong>{comment.commented_by}:</strong> {comment.text}
                        </p>
                        <CommentForm
                            onSubmit={(text, commentedBy) => handleAddReply(comment._id, text, commentedBy)}
                            buttonText="Reply"
                        />
                        {comment.replies.length > 0 && (
                            <div className="replies">
                                {comment.replies.map((reply) => (
                                    <p key={reply._id}>
                                        <strong>{reply.commented_by}:</strong> {reply.text}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Answer;

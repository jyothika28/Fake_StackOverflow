import React, { useState } from "react";
import Form from "../baseComponents/form/formView";
import Textarea from "../baseComponents/textarea/textAreaView";
import Input from "../baseComponents/input/inputView";

interface CommentFormProps {
    onSubmit: (text: string, commentedBy: string) => void; // Callback for submission
    buttonText?: string;
    initialText?: string; // Optional for editing
}

const CommentForm: React.FC<CommentFormProps> = ({
                                                     onSubmit,
                                                     buttonText = "Post Comment",
                                                     initialText = "",
                                                 }) => {
    const [text, setText] = useState(initialText);
    const [commentedBy, setCommentedBy] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && commentedBy.trim()) {
            onSubmit(text, commentedBy);
            setText("");
            setCommentedBy("");
        }
    };

    return (
        <Form>
            <Input
                title="Your Name"
                id="commentedBy"
                val={commentedBy}
                setState={setCommentedBy}
            />
            <Textarea
                title="Comment"
                id="comment"
                val={text}
                setState={setText}
                rows={4}
                hint="Enter your comment here..."
            />
            <button onClick={handleSubmit} className="bluebtn">
                {buttonText}
            </button>
        </Form>
    );
};

export default CommentForm;
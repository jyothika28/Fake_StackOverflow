import React, { useState } from "react";
import Form from "../baseComponents/form/formView";
import Textarea from "../baseComponents/textarea/textAreaView";
import Input from "../baseComponents/input/inputView";

interface CommentFormProps {
    onSubmit: (text: string, commentedBy: string) => void; // Callback for submission
    buttonText?: string; // Text for the button (default: "Post Comment")
}

const CommentForm: React.FC<CommentFormProps> = ({
                                                     onSubmit,
                                                     buttonText = "Post Comment",
                                                 }) => {
    const [text, setText] = useState("");
    const [commentedBy, setCommentedBy] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting comment inside handleSubmit:", text, commentedBy);
        if (text.trim() && commentedBy.trim()) {
            console.log("Submitting comment inside trim:", text, commentedBy);
            onSubmit(text, commentedBy); // Trigger the onSubmit callback
            console.log("Submitting comment inside onSubmit:", text, commentedBy);
            setText(""); // Clear the form
            setCommentedBy("");
        } else {
            console.error("Name or comment is missing.");
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
            <button type="submit" onClick={handleSubmit} className="bluebtn">
                {buttonText}
            </button>
        </Form>
    );
};

export default CommentForm;

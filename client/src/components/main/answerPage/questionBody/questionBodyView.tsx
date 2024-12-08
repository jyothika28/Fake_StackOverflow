import React, { useState } from "react";
import "./questionBodyView.css";
import { handleHyperlink } from "../../../../tool";
import Button from "@mui/material/Button";
import FlagIcon from "@mui/icons-material/Flag";
import Box from "@mui/material/Box";

interface QuestionBodyProps {
    views: number;
    text: string;
    askby: string;
    meta: string;
    questionId: string; // Add questionId prop
    isFlagged: boolean; // Whether the question is already flagged
    onFlag: (questionId: string) => void; // Function to handle flagging
}

// Component for the Question's Body
const QuestionBody = ({ views, text, askby, meta, questionId, isFlagged, onFlag }: QuestionBodyProps) => {
    const [flagged, setFlagged] = useState(isFlagged); // Local state to track if flagged

    const handleFlag = () => {
        if (!flagged) {
            onFlag(questionId); // Call the parent function to handle flagging
            setFlagged(true); // Update local state
        }
    };

    return (
        <div id="questionBody" className="questionBody right_padding">
            <div className="bold_title answer_question_view">{views} views</div>
            <div className="answer_question_text">{handleHyperlink(text)}</div>
            <div className="answer_question_right">
                <div className="question_author">{askby}</div>
                <div className="answer_question_meta">asked {meta}</div>
            </div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginLeft: 2,
                }}
            >
                <Button
                    variant="text"
                    startIcon={<FlagIcon />}
                    style={{
                        color: flagged ? "red" : "gray", // Red for flagged, gray otherwise
                    }}
                    onClick={handleFlag}
                    disabled={flagged} // Disable button if already flagged
                >
                    {flagged ? "Flagged" : "Flag"}
                </Button>
            </Box>
        </div>
    );
};

export default QuestionBody;

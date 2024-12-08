import { handleHyperlink } from "../../../../tool";
import "./answerView.css";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import FlagIcon from "@mui/icons-material/Flag";
import Box from "@mui/material/Box";

interface AnswerProps {
    text: string;
    ansBy: string;
    meta: string;
    questionId: string; // Add answerId prop
    answerId: string; // Add answerId prop
    isFlagged: boolean; // Whether the answer is already flagged
    onFlag: (questionId: string, answerId: string) => void; // Function to handle flagging
}

const Answer = ({ text, ansBy, meta, questionId, answerId, isFlagged, onFlag }: AnswerProps) => {
    const [flagged, setFlagged] = useState(isFlagged); // Local state to track if flagged

    const handleFlag = () => {
        if (!flagged) {
            onFlag(questionId, answerId); // Call the parent function to handle flagging
            setFlagged(true); // Update local state
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

export default Answer;

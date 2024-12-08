import React, { useState } from "react";
import "./questionBodyView.css";
import { handleHyperlink } from "../../../../tool";
import Button from "@mui/material/Button";
import FlagIcon from "@mui/icons-material/Flag";
import Box from "@mui/material/Box";
import { voteQuestion } from "../../../../services/questionService";

interface QuestionBodyProps {
    views: number;
    text: string;
    askby: string;
    meta: string;
    questionId: string; // Add questionId prop
    isFlagged: boolean; // Whether the question is already flagged
    onFlag: (questionId: string) => void; // Function to handle flagging
    votes: number;
}

// Component for the Question's Body
const QuestionBody = ({ views, text, askby, meta, questionId, isFlagged, onFlag, votes }: QuestionBodyProps) => {
    const [flagged, setFlagged] = useState(isFlagged); // Local state to track if flagged
    const [voteCount, setVoteCount] = useState<number>(votes);

    const handleVote = async (voteType: "upvote" | "downvote") => {
        try {
            const updatedQuestion = await voteQuestion(questionId, voteType);
            setVoteCount(updatedQuestion.votes); // Update vote count in state
        } catch (error) {
            console.error(`Error voting on question (${voteType}):`, error);
        }
    };


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
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 2,
                }}
            >
                <div>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleVote("upvote")}
                    >
                        Upvote
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleVote("downvote")}
                    >
                        Downvote
                    </Button>
                </div>
                <div className="voteCount">Votes: {voteCount}</div>
            </Box>
        </div>
    );
};

export default QuestionBody;

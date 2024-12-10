import { handleHyperlink } from "../../../../tool";
import "./answerView.css";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import FlagIcon from "@mui/icons-material/Flag";
import Box from "@mui/material/Box";
import {voteAnswer} from "../../../../services/answerService";

interface AnswerProps {
    text: string;
    ansBy: string;
    meta: string;
    questionId: string; // Add answerId prop
    answerId: string; // Add answerId prop
    isFlagged: boolean; // Whether the answer is already flagged
    onFlag: (questionId: string, answerId: string) => void; // Function to handle flagging
    votes: number;
}

const Answer = ({ text, ansBy, meta, questionId, answerId, isFlagged, onFlag, votes }: AnswerProps) => {
    const [flagged, setFlagged] = useState(isFlagged); // Local state to track if flagged
    const [voteCount, setVoteCount] = useState<number>(votes);

    const handleVote = async (voteType: "upvote" | "downvote") => {
        try {
            const updatedAnswer = await voteAnswer(questionId, answerId, voteType);
            console.log("Updated Answer:", updatedAnswer);
            setVoteCount(updatedAnswer.votes); // Update vote count in state
            console.log("Vote count updated:", voteCount);
        } catch (error) {
            console.error(`Error voting on answer (${voteType}):`, error);
        }
    };

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
                    id="flag"
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
                        id="upvote"
                        onClick={() => handleVote("upvote")}
                    >
                        Upvote
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        id="downvote"
                        onClick={() => handleVote("downvote")}
                    >
                        Downvote
                    </Button>
                </div>
                <div className="voteCount">Votes: {voteCount || "Refresh"}</div>
            </Box>
        </div>
    );
};

export default Answer;

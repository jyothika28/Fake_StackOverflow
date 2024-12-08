import { getMetaData } from "../../../tool";
import Answer from "./answer/answerView";
import AnswerHeader from "./header/headerView";
import "./answerPageView.css";
import QuestionBody from "./questionBody/questionBodyView";
import { VoidFunctionType } from "../../../types/functionTypes";
import { useAnswerPage } from "../../../hooks/useAnswerPage";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import CommentSection from "../comment/CommentSection";
import {flagComment} from "../../../services/commentService";
import {flagQuestion} from "../../../services/questionService";
import {flagAnswer} from "../../../services/answerService";

interface AnswerPageProps {
    qid: string;
    handleNewQuestion: VoidFunctionType;
    handleNewAnswer: VoidFunctionType;
}

const AnswerPage = ({
                        qid,
                        handleNewQuestion,
                        handleNewAnswer,
                    }: AnswerPageProps) => {
    const { question } = useAnswerPage(qid);

    if (!question) {
        return null;
    }

    const handleFlagComment = async (answerId: string, commentId: string) => {
        try {
            console.log(`handleFlagComment: Flagging comment ${commentId} for answer ${answerId}`);
            await flagComment(answerId, commentId);
            console.log(`Comment ${commentId} flagged successfully.`);
        } catch (error) {
            console.error(`Error flagging comment ${commentId}:`, error);
        }
    };

    const handleFlagQuestion = async (questionId: string) => {
        try {
            console.log(`Flagging question with ID: ${questionId}`);
            await flagQuestion(questionId); // API call to flag the question
            console.log(`Question ${questionId} flagged successfully.`);
        } catch (error) {
            console.error(`Error flagging question ${questionId}:`, error);
        }
    };

    const handleFlagAnswer = async (questionId: string, answerId: string) => {
        try {
            console.log(`Flagging answer with ID: ${answerId}`);
            await flagAnswer(questionId, answerId); // API call to flag the question
            console.log(`Answer ${answerId} flagged successfully.`);
        } catch (error) {
            console.error(`Error flagging answer ${answerId}:`, error);
        }
    };

    return (
        <>
            <AnswerHeader
                ansCount={question.answers.length}
                title={question.title}
                handleNewQuestion={handleNewQuestion}
            />
            <QuestionBody
                views={question.views}
                text={question.text}
                askby={question.asked_by}
                meta={getMetaData(new Date(question.ask_date_time))}
                questionId={question._id!}
                isFlagged={question.flagged}
                onFlag={handleFlagQuestion}
                votes={question.votes} // Pass votes
            />

            {question.answers.map((a, idx) => (
                <>
                    <Answer
                        key={idx}
                        text={a.text}
                        ansBy={a.ans_by}
                        meta={getMetaData(new Date(a.ans_date_time))}
                        questionId={qid}
                        answerId={a._id!}
                        isFlagged={a.flagged}
                        onFlag={() => handleFlagAnswer(qid, a._id!)}
                    />
                    {/* Render the comments section for each answer */}
                    <CommentSection
                        answerId={a._id!}
                        comments={a.comments || []}
                        onFlag={(commentId) => handleFlagComment(a._id!, commentId)}
                    />

                </>
            ))}
            <Button
                variant="contained"
                className="bluebtn ansButton"
                style={{
                    marginRight: "20px",
                    backgroundColor: "#3090e2",
                    marginTop: "20px",
                    marginLeft: "20px",
                }}
                startIcon={<CreateIcon />}
                onClick={() => {
                    handleNewAnswer();
                }}
            >
                Answer Question
            </Button>
        </>
    );
};

export default AnswerPage;

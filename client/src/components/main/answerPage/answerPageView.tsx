import { getMetaData } from "../../../tool";
import Answer from "./answer/answerView";
import AnswerHeader from "./header/headerView";
import "./answerPageView.css";
import QuestionBody from "./questionBody/questionBodyView";
import { VoidFunctionType } from "../../../types/functionTypes";
import { useAnswerPage } from "../../../hooks/useAnswerPage";
import Button from "@mui/material/Button";
import CreateIcon from '@mui/icons-material/Create';

interface AnswerPageProps {
  qid: string;
  handleNewQuestion: VoidFunctionType;
  handleNewAnswer: VoidFunctionType;
}

// Component for the Answers page
const AnswerPage = ({
  qid,
  handleNewQuestion,
  handleNewAnswer,
}: AnswerPageProps) => {
  const { question } = useAnswerPage(qid);

  if (!question) {
    return null;
  }

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
      />

        {question.answers.map((a) => (
            <Answer
                text={a.text}
                ansBy={a.ans_by}
                meta={getMetaData(new Date(a.ans_date_time))}
                answerId={a._id!}
                comments={a.comments || []}
            />
        ))}

        {/* <button
        className="bluebtn ansButton"
        onClick={() => {
          handleNewAnswer();
        }}
      >
        Answer Question
      </button> */}
      <Button
          variant="contained" className="bluebtn ansButton"
          style={{ marginRight: "20px",backgroundColor:"#3090e2", marginTop:"20px",marginLeft:"20px" }}
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

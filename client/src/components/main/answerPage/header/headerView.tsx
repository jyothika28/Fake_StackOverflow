import "./headerView.css";
import { VoidFunctionType } from "../../../../types/functionTypes";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface AnswerHeaderProps {
  ansCount: number;
  title: string;
  handleNewQuestion: VoidFunctionType;
}

// Header for the Answer page
const AnswerHeader = ({
  ansCount,
  title,
  handleNewQuestion,
}: AnswerHeaderProps) => {
  return (
    <div id="answersHeader" className="space_between right_padding">
      <div className="bold_title">{ansCount} answers</div>
      <div className="bold_title answer_question_title">{title}</div>
      {/* <button
        className="bluebtn"
        onClick={() => {
          handleNewQuestion();
        }}
      >
        Ask a Question
      </button> */}
      <Button
          variant="contained"
          style={{ marginRight: "20px" }}
          startIcon={<AddIcon />}
          onClick={() => {
            handleNewQuestion();
          }}
        >
          Ask a Question
        </Button>
    </div>
  );
};

export default AnswerHeader;

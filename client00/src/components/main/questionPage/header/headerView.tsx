import "./headerView.css";
import OrderButton from "./orderButton/orderButtonView";
import {
  VoidFunctionType,
  MessageFunctionType,
} from "../../../../types/functionTypes";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ButtonGroup from "@mui/material/ButtonGroup";

interface QuestionHeaderProps {
  title_text: string;
  qcnt: number;
  setQuestionOrder: MessageFunctionType;
  handleNewQuestion: VoidFunctionType;
}

const QuestionHeader = ({
  title_text,
  qcnt,
  setQuestionOrder,
  handleNewQuestion,
}: QuestionHeaderProps) => {
  const options = ["Newest", "Active", "Unanswered"];
  return (
    <div>
      <div className="space_between right_padding">
        <div className="bold_title">{title_text}</div>
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
        {/* <button
          className="bluebtn"
          onClick={() => {
            handleNewQuestion();
          }}
        >
          Ask a Question
        </button> */}
      </div>
      <div className="space_between right_padding">
        <div id="question_count">{qcnt} questions</div>
        <div className="btns">
          <ButtonGroup variant="outlined" color="primary">
            {options.map((m, idx) => (
              <OrderButton
                key={idx}
                message={m}
                setQuestionOrder={setQuestionOrder}
              />
            ))}
          </ButtonGroup>
          {/* {options.map((m, idx) => (
            <OrderButton
              key={idx}
              message={m}
              setQuestionOrder={setQuestionOrder}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default QuestionHeader;

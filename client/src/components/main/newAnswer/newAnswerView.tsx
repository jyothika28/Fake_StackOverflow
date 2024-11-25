import "./newAnswerView.css";
import Form from "../baseComponents/form/formView";
import Input from "../baseComponents/input/inputView";
import Textarea from "../baseComponents/textarea/textAreaView";
import { useNewAnswer } from "../../../hooks/useNewAnswer";
import { QuestionIdFunctionType } from "../../../types/functionTypes";
import Typography from "@mui/material/Typography";

interface NewAnswerProps {
  qid: string;
  handleAnswer: QuestionIdFunctionType;
}

const NewAnswer = ({ qid, handleAnswer }: NewAnswerProps) => {
  const { usrn, setUsrn, text, setText, usrnErr, textErr, postAnswer } =
    useNewAnswer(qid, handleAnswer);

  return (
    <>
    <Typography variant="h4" style={{fontWeight: "bold",marginBottom: "20px",marginTop: "20px"}}
       component="h2" align="center" gutterBottom>
        Add Answer
      </Typography>
    <Form>
      <Input
        title={"Username"}
        id={"answerUsernameInput"}
        val={usrn}
        setState={setUsrn}
        err={usrnErr}
      />
      <Textarea
        title={"Answer Text"}
        id={"answerTextInput"}
        val={text}
        setState={setText}
        err={textErr}
      />
      <div className="btn_indicator_container">
        <button className="form_postBtn" onClick={postAnswer}>
          Post Answer
        </button>
        <div className="mandatory_indicator">* indicates mandatory fields</div>
      </div>
    </Form>
    </>
  );
};

export default NewAnswer;

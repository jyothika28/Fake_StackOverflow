import "./newQuestionView.css";
import Form from "../baseComponents/form/formView";
import Input from "../baseComponents/input/inputView";
import Textarea from "../baseComponents/textarea/textAreaView";
import { useNewQuestion } from "../../../hooks/useNewQuestion";
import { VoidFunctionType } from "../../../types/functionTypes";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

interface NewQuestionProps {
  handleQuestions: VoidFunctionType;
}
const NewQuestion = ({ handleQuestions }: NewQuestionProps) => {
  const {
    title,
    setTitle,
    text,
    setText,
    tag,
    setTag,
    usrn,
    setUsrn,
    titleErr,
    textErr,
    tagErr,
    usrnErr,
    postQuestion,
  } = useNewQuestion(handleQuestions);

  return (
    //Title
    <>
    
      <Typography variant="h4" style={{fontWeight: "bold",marginBottom: "20px",marginTop: "20px"}}
       component="h2" align="center" gutterBottom>
        Add a New Question
      </Typography>
      <Form>
        <Input
          title={"Question Title"}
          hint={"Limit title to 100 characters or less"}
          id={"formTitleInput"}
          val={title}
          setState={setTitle}
          err={titleErr}
        />
        <Textarea
          title={"Question Text"}
          hint={"Add details"}
          id={"formTextInput"}
          val={text}
          setState={setText}
          err={textErr}
          rows={4}
        />
        <Input
          title={"Tags"}
          hint={"Add keywords separated by whitespace"}
          id={"formTagInput"}
          val={tag}
          setState={setTag}
          err={tagErr}
        />
        <Input
          title={"Username"}
          id={"formUsernameInput"}
          val={usrn}
          setState={setUsrn}
          err={usrnErr}
        />
        <div className="btn_indicator_container">
          {/* <button className="form_postBtn" onClick={postQuestion}>
          Post Question
        </button> */}
          <Button
            variant="contained"
            onClick={postQuestion}
            sx={{ textTransform: "none" }}
          >
            Post Question
          </Button>
          <div className="mandatory_indicator">
            * indicates mandatory fields
          </div>
        </div>
      </Form>
    </>
  );
};

export default NewQuestion;

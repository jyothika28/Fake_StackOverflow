import "./questionBodyView.css";
import { handleHyperlink } from "../../../../tool";

interface QuestionBodyProps {
  views: number;
  text: string;
  askby: string;
  meta: string;
}

// Component for the Question's Body
const QuestionBody = ({ views, text, askby, meta }: QuestionBodyProps) => {
  return (
    <div id="questionBody" className="questionBody right_padding">
      <div className="bold_title answer_question_view">{views} views</div>
      <div className="answer_question_text">{handleHyperlink(text)}</div>
      <div className="answer_question_right">
        <div className="question_author">{askby}</div>
        <div className="answer_question_meta">asked {meta}</div>
      </div>
    </div>
  );
};

export default QuestionBody;

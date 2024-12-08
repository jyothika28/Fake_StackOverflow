import { handleHyperlink } from "../../../../tool";
import "./answerView.css";

interface AnswerProps {
    text: string;
    ansBy: string;
    meta: string;
}

const Answer = ({ text, ansBy, meta }: AnswerProps) => {
    return (
        <div className="answer right_padding">
            <div id="answerText" className="answerText">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor">
                <div className="answer_author">{ansBy}</div>
                <div className="answer_question_meta">{meta}</div>
            </div>
        </div>
    );
};

export default Answer;

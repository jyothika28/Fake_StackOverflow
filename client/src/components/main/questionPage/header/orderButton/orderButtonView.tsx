import "./orderButtonView.css";
import { MessageFunctionType } from "../../../../../types/functionTypes";

interface OrderButtonProps {
  message: string;
  setQuestionOrder: MessageFunctionType;
}

const OrderButton = ({ message, setQuestionOrder }: OrderButtonProps) => {
  return (
    <button
      className="btn"
      onClick={() => {
        setQuestionOrder(message);
      }}
    >
      {message}
    </button>
  );
};

export default OrderButton;

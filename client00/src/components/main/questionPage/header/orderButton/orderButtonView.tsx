import "./orderButtonView.css";
import { MessageFunctionType } from "../../../../../types/functionTypes";
import Button from "@mui/material/Button";


interface OrderButtonProps {
  message: string;
  setQuestionOrder: MessageFunctionType;
}

const OrderButton = ({ message, setQuestionOrder }: OrderButtonProps) => {
  return (
    <>
        {/* <button
      className="btn"
      onClick={() => {
        setQuestionOrder(message);
      }}
    >
      {message}
    </button> */}
   <Button
      variant="outlined"
      onClick={() => {
        setQuestionOrder(message);
      }}
    >
      {message}
    </Button>
</>

  );

};

export default OrderButton;

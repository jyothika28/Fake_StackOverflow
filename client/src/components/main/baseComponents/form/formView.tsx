import React, { ReactNode } from "react";
import "./formView.css";

interface FormProps {
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  return <div className="form">{children}</div>;
};

export default Form;

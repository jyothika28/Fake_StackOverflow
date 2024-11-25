import React, { ReactNode } from "react";
import "./formView.css";
import { Box } from "@mui/material";

interface FormProps {
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ children}) => {
  //return <div className="form">{children}</div>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1, // Spacing between children
        padding: 2, // Internal padding
        border: "2px solid #ccc", // Optional: for a bordered form look
        borderRadius: 2,
        backgroundColor: "#ffffff",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Form;

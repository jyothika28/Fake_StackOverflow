import "../input/inputView.css";
import { StringFunctionType } from "../../../../types/functionTypes";
import { TextField } from "@mui/material";

interface TextareaProps {
  title: string;
  mandatory?: boolean;
  hint?: string;
  id: string;
  val: string;
  setState: StringFunctionType;
  err?: string;
}

const Textarea = ({
  title,
  mandatory = true,
  hint,
  id,
  val,
  setState,
  err,
}: TextareaProps) => {
  return (
    <>
     <TextField
      id={id}
      label={`${title}${mandatory ? " *" : ""}`} // Add asterisk for mandatory fields
      variant="outlined"
      value={val}
      onChange={(e) => setState(e.target.value)} // Update state on input
      error={!!err} // Boolean to indicate error
      helperText={err || hint} // Show error message or hint
      multiline // Enable multi-line input
      rows={4} // Adjust number of rows to your preference
      fullWidth // Ensures the input spans the full width of its container
    />
    </>
  );
};

export default Textarea;

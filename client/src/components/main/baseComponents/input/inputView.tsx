import "./inputView.css";
import { StringFunctionType } from "../../../../types/functionTypes";
import TextField from "@mui/material/TextField";

interface InputProps {
  title: string;
  hint?: string;
  id: string;
  mandatory?: boolean;
  val: string;
  setState: StringFunctionType;
  err?: string;
}

const Input = ({
  title,
  hint,
  id,
  mandatory = true,
  val,
  setState,
  err,
}: InputProps) => {
  return (
    <>
      {/* <div className="input_title">
        {title}
        {mandatory ? "*" : ""}
      </div>
      {hint && <div className="input_hint">{hint}</div>}
      <input
        id={id}
        className="input_input"
        type="text"
        value={val}
        onInput={(e) => {
          setState(e.currentTarget.value);
        }}
      />
      {err && <div className="input_error">{err}</div>} */}

<TextField
      id={id}
      label={`${title}${mandatory ? " *" : ""}`} // Add asterisk for mandatory fields
      variant="outlined"
      value={val}
      onChange={(e) => setState(e.target.value)} // Update the state on input
      error={!!err} // Boolean to indicate error
      helperText={err || hint} // Show error message or hint below the input
      fullWidth // Ensures the input spans the full width of its container
    />
    </>
  );
};

export default Input;

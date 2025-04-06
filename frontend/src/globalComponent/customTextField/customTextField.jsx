import { TextField } from "@mui/material";
import "./customTextField.css";

const CustomTextField = ({ id, label, ...props }) => {
  return (
    <TextField id={id} label={label} className="custom-text-field" {...props} />
  );
};

export default CustomTextField;

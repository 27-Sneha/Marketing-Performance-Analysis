import { Button } from "@mui/material";
import "./primaryButton.css";

const PrimaryButton = ({ text, className, onClick, ...props }) => {
  return (
    <Button
      variant="contained"
      className={`primary ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;

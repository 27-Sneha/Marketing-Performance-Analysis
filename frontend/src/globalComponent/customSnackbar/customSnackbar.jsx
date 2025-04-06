import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ open, errorMessage, onClose, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ fontSize: "18px" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;

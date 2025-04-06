import { Grid, Typography, Snackbar, TextField, Alert } from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginHeroSection from "../loginHeroSection/loginHeroSection";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import { AuthContext } from "../../context/authContext";
import { fetchOtpApi, submitOtpApi } from "../../api/apiCalls";
import "./verifyUser.css";

const VerifyUser = () => {
  const { jwtToken, setJwtToken } = useContext(AuthContext);
  console.log("token", jwtToken);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(180);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const inputRefs = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOtpApi(jwtToken);
        console.log("OTP data", response);
      } catch (err) {
        console.log("Error fetching OTP:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setOpenSnackbar(true);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if a digit is entered
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace to move to the previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await submitOtpApi(jwtToken, otp);
      setJwtToken(response.token);
      if (response.redirectUrl) {
        navigate(`${response.redirectUrl}`);
      }
    } catch (err) {
      console.log("Error submitting OTP:", err);
    }
  };
  return (
    <Grid container className="login-container">
      <Grid item lg={9} className="login-form">
        <Grid container className="login-inner-container">
          <Grid item xs={12} lg={5} className="login-left-section">
            <Grid container className="login-left-section-container">
              <Grid item xs={12}>
                <Typography
                  fontSize={{ xs: "30px", sm: "26px", xl: "34px" }}
                  color="#0070b9"
                >
                  <b>OTP VERIFICATION</b>
                </Typography>
              </Grid>
              <Grid item xs={12} className="otp-input-section">
                <Grid container spacing={2}>
                  {otp.map((digit, index) => (
                    <Grid item xs={2}>
                      <TextField
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        className="otp-input"
                        variant="outlined"
                        inputProps={{
                          maxLength: 1,
                          style: { textAlign: "center", fontSize: "30px" },
                        }}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography className="otp-timer">
                  OTP expires in{" "}
                  <span style={{ color: "red" }}>{timeLeft}s</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton
                  text="Submit"
                  className="otp-submit-btn"
                  onClick={handleSubmit}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Didn't receive OTP? <Link>Resend OTP</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={7} display={{ xs: "none", lg: "flex" }}>
            <LoginHeroSection />
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ fontSize: "18px" }}
        >
          OTP has expired! Please request a new one.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default VerifyUser;

import {
  Grid,
  Typography,
  FormControl,
  Divider,
  Button,
  IconButton,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import CustomTextField from "../../globalComponent/customTextField/customTextField";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import LoginHeroSection from "../loginHeroSection/loginHeroSection";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { AuthContext } from "../../context/authContext";
import "./register.css";
import CustomSnackbar from "../../globalComponent/customSnackbar/customSnackbar";

const Register = () => {
  const { register, facebookLogin } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(username, email, password, confirmPassword);
      if (result.redirectUrl) {
        navigate(`${result.redirectUrl}`);
      }
    } catch (err) {
      console.log("errorr", err.message);
      console.log("errorr", err.stack);
      setOpenSnackbar(true);
      setError(err.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFacebookLogin = async (data) => {
    try {
      const result = await facebookLogin(data);
      if (result.redirectUrl) {
        navigate(`${result.redirectUrl}`);
      }
    } catch (err) {
      setOpenSnackbar(true);
      setError(err.message);
    }
  };

  return (
    <Grid container className="login-container">
      <Grid item lg={9} className="login-form">
        <Grid container className="login-inner-container">
          <Grid item xs={12} lg={5} className="register-left-section">
            <Grid container className="login-left-section-container">
              <Grid item xs={12}>
                <Typography
                  fontSize={{ xs: "30px", sm: "26px", xl: "34px" }}
                  color="#0070b9"
                >
                  <b>REGISTER</b>
                </Typography>
              </Grid>
              <Grid item xs={12} className="login-left-section-form">
                <FormControl>
                  <CustomTextField
                    id="username"
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl>
                  <CustomTextField
                    id="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl>
                  <CustomTextField
                    id="password"
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "password" : "text"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    className="custom-text-field"
                  />
                </FormControl>
                <FormControl>
                  <CustomTextField
                    id="confirm-password"
                    label="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showPassword ? "password" : "text"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    className="custom-text-field"
                  />
                </FormControl>
                <Link to="/verify">
                  <PrimaryButton
                    text="SIGN UP"
                    className="login-btn"
                    onClick={handleSubmit}
                  ></PrimaryButton>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link>Forgot your pass word?</Link>
              </Grid>
              <Grid item xs={12}>
                <Divider>or</Divider>
              </Grid>
              <Grid item className="login-auth-provider-section">
                <FacebookLogin
                  appId="667054509095040"
                  autoLoad={false}
                  callback={handleFacebookLogin}
                  fields="name,email"
                  scope="public_profile,email"
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      variant="outlined"
                      className="login-auth-btn"
                      startIcon={<FacebookIcon className="login-auth-icon" />}
                      onClick={renderProps.onClick}
                    >
                      Sign up with Facebook
                    </Button>
                  )}
                />
                <Typography>
                  Already have an account? <Link to="/login">Sign in</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={7} display={{ xs: "none", lg: "flex" }}>
            <LoginHeroSection />
          </Grid>
        </Grid>
      </Grid>
      <CustomSnackbar
        open={openSnackbar}
        errorMessage={error}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
      />
    </Grid>
  );
};

export default Register;

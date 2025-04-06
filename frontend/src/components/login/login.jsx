import {
  Grid,
  Typography,
  FormControl,
  Divider,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import CustomTextField from "../../globalComponent/customTextField/customTextField";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import LoginHeroSection from "../loginHeroSection/loginHeroSection";
import { AuthContext } from "../../context/authContext";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import CustomSnackbar from "../../globalComponent/customSnackbar/customSnackbar";
import "./login.css";

const Login = () => {
  const { user, login, facebookLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result.redirectUrl) {
        navigate(`${result.redirectUrl}`);
      }
    } catch (err) {
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
      console.log("hiiiiiiiii", result);
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
          <Grid item xs={12} lg={5} className="login-left-section">
            <Grid container className="login-left-section-container">
              <Grid item xs={12}>
                <Typography
                  fontSize={{ xs: "30px", sm: "34px" }}
                  color="#0070b9"
                >
                  <b>LOGIN</b>
                </Typography>
              </Grid>
              <Grid item xs={12} className="login-left-section-form">
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
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    className="custom-text-field"
                  />
                </FormControl>
                <PrimaryButton
                  text="SIGN IN"
                  className="login-btn"
                  onClick={handleSubmit}
                ></PrimaryButton>
              </Grid>
              <Grid item xs={12}>
                <Link>Forgot your password?</Link>
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
                      Sign in with Facebook
                    </Button>
                  )}
                />
                <Typography>
                  Don't have an account? <Link to="/register">Sign up</Link>
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

export default Login;

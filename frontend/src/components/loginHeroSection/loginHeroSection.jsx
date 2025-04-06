import { Grid, Typography } from "@mui/material";
import login from "../../assets/login.png";
import "./loginHeroSection.css";

const LoginHeroSection = () => {
  return (
    <Grid container className="login-right-section">
      <Grid item lg={12} className="login-right-upper-section">
        <Typography fontSize={{ lg: "50px", xl: "65px" }} color="white">
          MARKETING PERFORMANCE ANALYSIS
        </Typography>
      </Grid>
      <Grid item xl={6} display={{ xs: "none", xl: "flex" }}>
        <Typography fontSize={{ lg: "26px", xl: "34px" }} color="white">
          Your go-to platform for <b>TRACKING</b>, <b>ANALYZING</b>, and{" "}
          <b>OPTIMIZING</b> marketing performance!
        </Typography>
      </Grid>
      <Grid item lg={12} xl={6} className="login-image">
        <img src={login} />
      </Grid>
    </Grid>
  );
};

export default LoginHeroSection;

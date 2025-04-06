import { Grid, Paper, InputBase, IconButton, Box, Badge } from "@mui/material";
import { Search, Menu } from "@mui/icons-material";
import { useContext } from "react";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import BreadCrumb from "../breadCrumb/breadCrumb";

const Navbar = ({ handleOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.status) {
      navigate("/login");
    }
  };
  return (
    <Grid container className="navbar-container">
      <Grid item xs={1} display={{ xs: "flex", md: "none" }}>
        <Menu className="hamburger-icon" onClick={handleOpen} />
      </Grid>
      <Grid item xs={7} md={8} className="navbar-search-section">
        <BreadCrumb />
      </Grid>
      <Grid item xs={4} md={4} className="navbar-right-section">
        <PrimaryButton
          text="Logout"
          className="navbar-logout-btn"
          onClick={handleLogout}
        />
      </Grid>
    </Grid>
  );
};

export default Navbar;

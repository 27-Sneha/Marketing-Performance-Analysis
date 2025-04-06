import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import {
  Close,
  Business,
  Dashboard,
  Key,
  CampaignOutlined,
} from "@mui/icons-material";
import { forwardRef, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BusinessContext } from "../../context/businessContext";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import "./customDrawer.css";

const dashboard = [
  { icon: <Dashboard />, text: "Dashboard", path: "/dashboard" },
  { icon: <Key />, text: "Access Control", path: "/access-control" },
];

const CustomDrawer = forwardRef((props, ref) => {
  const { businesses, activeBusiness, setActiveBusiness } =
    useContext(BusinessContext);
  const [businessSearch, setBusinessSearch] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  // console.log("path", pathname);

  const handleDrawerClose = () => {
    ref.current.style.display = "none";
  };

  const handleBusinessClick = (business) => {
    setActiveBusiness(business.id);
    navigate("/dashboard");
  };

  const handleAddBusinessClick = () => {
    navigate("/dashboard/add-business");
  };

  return (
    <Drawer variant="permanent" className="paper-container" ref={ref}>
      <Box sx={{ padding: "0 20px" }} role="presentation">
        <div className="logo-section">
          <Typography fontSize="30px" className="drawer-logo">
            <b>LOGO</b>
          </Typography>
          <Close className="close-icon" onClick={handleDrawerClose} />
        </div>
        {/* Dashboard Section */}
        <List>
          {dashboard.map((content) => (
            <ListItem key={content.text} disablePadding>
              <Link to={content.path} className="dashboard-section">
                <ListItemButton
                  sx={{
                    backgroundColor:
                      pathname === content.path ? "#1565C0" : "inherit",
                    color: pathname === content.path ? "#fff" : "#000",
                    "&:hover": {
                      backgroundColor:
                        pathname === content.path ? "#1565C0" : "inherit",
                      color: pathname === content.path ? "#fff" : "#000",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        pathname === content.path
                          ? "#fff"
                          : "#rgba(0, 0, 0, 0.54)",
                      "&:hover": {
                        color:
                          pathname === content.path
                            ? "#fff"
                            : "#rgba(0, 0, 0, 0.54)",
                      },
                    }}
                  >
                    {content.icon}
                  </ListItemIcon>
                  <ListItemText primary={content.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        {businesses.length !== 0 ? (
          <>
            <Divider />
            <Typography fontSize="18px" fontWeight="bold" padding="20px 0">
              Businesses
            </Typography>
            <TextField
              size="small"
              placeholder="Search Business"
              fullWidth
              value={businessSearch}
              onChange={(e) => setBusinessSearch(e.target.value)}
              sx={{ mb: 1 }}
            />
            <List sx={{ maxHeight: 200, overflowY: "auto" }}>
              {businesses
                .filter((b) =>
                  b.name.toLowerCase().includes(businessSearch.toLowerCase())
                )
                .map((business) => (
                  <ListItem key={business.name} disablePadding>
                    <ListItemButton
                      onClick={() => handleBusinessClick(business)}
                      sx={{
                        backgroundColor:
                          activeBusiness === business.id
                            ? "#1565C0"
                            : "inherit",
                        color: activeBusiness === business.id ? "#fff" : "#000",
                        "&:hover": {
                          backgroundColor:
                            activeBusiness === business.id
                              ? "#1565C0"
                              : "inherit",
                          color:
                            activeBusiness === business.id ? "#fff" : "#000",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Business
                          sx={{
                            color:
                              activeBusiness === business.id
                                ? "#fff"
                                : "#rgba(0, 0, 0, 0.54)",
                            "&:hover": {
                              color:
                                activeBusiness === business.id
                                  ? "#fff"
                                  : "#rgba(0, 0, 0, 0.54)",
                            },
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={business.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
            <PrimaryButton
              text="Add Business"
              className="add-business-btn"
              onClick={handleAddBusinessClick}
            />
          </>
        ) : (
          <p></p>
        )}
      </Box>
    </Drawer>
  );
});
export default CustomDrawer;

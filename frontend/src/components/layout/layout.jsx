import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import CustomDrawer from "../../components/customDrawer/customDrawer";
import { BusinessContext } from "../../context/businessContext";
import { AuthContext } from "../../context/authContext";
import { businessesApi } from "../../api/apiCalls";
import "./layout.css";

const Layout = () => {
  const { jwtToken } = useContext(AuthContext);
  const {
    setLoading,
    businesses,
    setBusinesses,
    activeBusiness,
    setActiveBusiness,
  } = useContext(BusinessContext);
  const drawerRef = useRef(null);
  const handleDrawerOpen = () => {
    drawerRef.current.style.display = "flex";
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await businessesApi(jwtToken);
        setLoading(false);
        if (response) {
          setBusinesses(response.businesses);
        }
        setActiveBusiness(response.businesses[0].id);
      } catch (err) {
        setLoading(false);
        console.log("Error fetching list of businesss", err);
      }
    };

    fetchBusinesses();
  }, []);

  useEffect(() => {
    if (
      pathname !== "/dashboard/add_business" &&
      businesses.length > 0 &&
      !activeBusiness
    ) {
      setActiveBusiness(businesses[0].id);
    }
  }, [pathname]);

  return (
    <div className="dashboard">
      <header className="header">
        <Navbar handleOpen={handleDrawerOpen} />
      </header>
      <aside className="sidebar">
        <CustomDrawer ref={drawerRef} />
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

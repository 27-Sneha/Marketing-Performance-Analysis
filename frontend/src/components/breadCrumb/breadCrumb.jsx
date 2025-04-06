import { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Typography } from "@mui/material";
import { BusinessContext } from "../../context/businessContext";
import "./breadCrumb.css";

const BreadCrumb = () => {
  const location = useLocation();
  const { activeBusiness, businesses } = useContext(BusinessContext);
  const pathnames = location.pathname.split("/").filter((x) => x);
  const activeBusinessName = useMemo(() => {
    if (activeBusiness) {
      return businesses.find((business) => business.id === activeBusiness).name;
    }
    return null;
  }, [activeBusiness]);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="large" />}
    >
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={to} color="textPrimary" className="breadcrumb-text">
            {value.replaceAll("-", " ")}
          </Typography>
        ) : (
          <Typography key={to} className="breadcrumb-text">
            {value.replaceAll("-", " ")}
          </Typography>
        );
      })}
      {activeBusiness && (
        <Typography className="breadcrumb-text">
          {activeBusinessName}
        </Typography>
      )}
    </Breadcrumbs>
  );
};
export default BreadCrumb;

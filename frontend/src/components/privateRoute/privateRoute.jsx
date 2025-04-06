import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { jwtToken } = useContext(AuthContext);
  if (jwtToken === null) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;

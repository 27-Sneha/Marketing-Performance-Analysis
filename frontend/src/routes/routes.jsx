import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/login/login";
import Register from "../components/register/register";
import VerifyUser from "../components/verifyUser/verifyUser";
import { BusinessProvider } from "../context/businessContext";
import Layout from "../components/layout/layout";
import TabComponent from "../components/tabComponent/tabComponent";
import AccessControl from "../pages/accessControl/accessControl";
import AddBusinessForm from "../components/addBusinessForm/addBusinessForm";
import PrivateRoute from "../components/privateRoute/privateRoute";

const RoutesConfig = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify",
    element: <VerifyUser />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />, // Redirect to login by default
  },
  {
    path: "/",
    element: (
      <PrivateRoute
        element={
          <BusinessProvider>
            <Layout />
          </BusinessProvider>
        }
      />
    ),
    children: [
      {
        path: "access-control",
        element: <AccessControl />,
      },
      {
        path: "dashboard",
        element: <TabComponent />,
      },
      {
        path: "dashboard/add-business",
        element: <AddBusinessForm />,
      },
      {
        path: "dashboard/link",
        element: <AccessControl />,
      },
    ],
  },
]);

export default RoutesConfig;

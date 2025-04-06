import { Grid, Typography } from "@mui/material";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import AccessControlTable from "../../components/accessControlTable/accessControlTable";
import AddUserModal from "../../components/addUserModal/addUserModal";
import { useContext, useEffect, useState } from "react";

import "./accessControl.css";
import { BusinessContext } from "../../context/businessContext";

const AccessControl = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);

  const { activeBusiness, AccessControlDataFunction } =
    useContext(BusinessContext);
  const [accessControlData, setAccessControlData] = useState([]);

  useEffect(() => {
    const fetchAcessControlData = async () => {
      const response = await AccessControlDataFunction();
      console.log("acessss", response.users);
      if (response.status) {
        setAccessControlData(response.users);
        // console.log("hsbdkuhirjgkh", response.data);
      }
    };
    fetchAcessControlData();
  }, [activeBusiness]);

  return (
    <Grid container className="access-control-container">
      <Grid item xs={12} className="access-control-header">
        <Typography fontSize="30px">Business Name</Typography>
        <PrimaryButton
          text="Add User"
          className="add-user-btn"
          onClick={handleOpen}
        />
      </Grid>
      <Grid item xs={12} className="access-control-table-section">
        <AccessControlTable accessControlData={accessControlData} />
      </Grid>
      <AddUserModal
        setAccessControlData={setAccessControlData}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Grid>
  );
};

export default AccessControl;

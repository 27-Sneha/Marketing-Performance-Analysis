import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Typography, Snackbar, Alert } from "@mui/material";
import CustomTextField from "../../globalComponent/customTextField/customTextField";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import { BusinessContext } from "../../context/businessContext";
import { addBusinessApi } from "../../api/apiCalls";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../globalComponent/customSnackbar/customSnackbar";
import "./addBusinessForm.css";

const AddBusinessForm = () => {
  const { setActiveBusiness, setBusinesses } = useContext(BusinessContext);
  const { jwtToken } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [managerAccountId, setManagerAccountId] = useState("");
  const [msg, setMsg] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleIdChange = (e) => setId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleManagerAccountIdChange = (e) =>
    setManagerAccountId(e.target.value);

  useEffect(() => {
    setActiveBusiness(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addBusinessApi(
        jwtToken,
        id,
        managerAccountId,
        name
      );

      const newBusiness = response.data.business[0];
      setBusinesses((prev) => [...prev, newBusiness]);
      setActiveBusiness(newBusiness.id);
      setSuccessSnackbar(true);
      setMsg(response.data.message);
      setTimeout(() => {
        navigate(`/dashboard?business_id=${newBusiness.id}`);
      }, 2000);
      setId("");
      setName("");
      setManagerAccountId("");
    } catch (error) {
      console.log("falsee", error.message);
      setErrorSnackbar(true);
      setMsg(error.message);
    }
  };

  return (
    <Paper className="add-business-form-container">
      <Typography variant="h5" component="h2">
        Add Business
      </Typography>
      <form>
        <CustomTextField
          id="provider-id"
          label="Provider ID"
          value={id}
          onChange={handleIdChange}
          fullWidth
          margin="normal"
          required
        />
        <CustomTextField
          id="business-name"
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
          required
        />
        <CustomTextField
          id="manager-account-id"
          label="Manager Account ID"
          value={managerAccountId}
          onChange={handleManagerAccountIdChange}
          fullWidth
          margin="normal"
          required
        />
        <Box className="add-business-form-submit">
          <PrimaryButton text="Submit" onClick={handleSubmit} />
        </Box>
      </form>
      <CustomSnackbar
        open={errorSnackbar}
        errorMessage={msg}
        onClose={() => setErrorSnackbar(false)}
        severity="error"
      />
      <CustomSnackbar
        open={successSnackbar}
        errorMessage={msg}
        onClose={() => setSuccessSnackbar(false)}
        severity="success"
      />
    </Paper>
  );
};

export default AddBusinessForm;

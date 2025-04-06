import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
} from "@mui/material";
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import "./addUserModal.css";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import { assignUserRoleApi, searchUserApi } from "../../api/apiCalls";
import { AuthContext } from "../../context/authContext";
import { BusinessContext } from "../../context/businessContext";

const AddUserModal = ({ setAccessControlData, open, onClose }) => {
  const { jwtToken } = useContext(AuthContext);
  const { activeBusiness } = useContext(BusinessContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const mockRoles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Marketing-Team" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === "") {
        setUsers([]);
        return;
      }
      setLoading(true);
      try {
        const response = await searchUserApi(jwtToken, searchTerm);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setRoles(mockRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleAssignRole = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      console.log("Assigning role:", {
        userId: selectedUser.id,
        roleId: selectedRole,
      });
      // Simulate API delay
      await assignUserRoleApi(
        jwtToken,
        activeBusiness,
        selectedUser.id,
        selectedRole
      );
      setAccessControlData((prev) => [
        ...prev,
        {
          ...selectedUser,
          role: mockRoles.find((role) => role.id === selectedRole).name,
        },
      ]);
      setSelectedUser(null);
      setSelectedRole("");
      setSearchTerm("");
      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper elevation={3} className="modal-paper">
        <Typography variant="h6" gutterBottom>
          Assign Role to User
        </Typography>
        <Box className="search-bar">
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.name} (${option.email})`}
            loading={loading}
            value={selectedUser}
            onChange={(_, newValue) => setSelectedUser(newValue)}
            inputValue={searchTerm}
            onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search users"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon style={{ marginRight: 8 }} />,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            noOptionsText={
              searchTerm ? "No users found" : "Search user by id or name"
            }
          />
        </Box>
        {selectedUser && (
          <>
            <Box className="role-select">
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="">
                    <em>Select a role</em>
                  </MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <PrimaryButton
              startIcon={<PersonAddIcon />}
              onClick={handleAssignRole}
              disabled={loading || selectedRole === ""}
              className="assign-role-btn"
              text="Assign Role"
            >
              {loading ? "Assigning..." : "Assign Role"}
            </PrimaryButton>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default AddUserModal;

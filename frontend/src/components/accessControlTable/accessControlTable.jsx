import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import "./accessControlTable.css";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerClassName: "header-bold",
  },
  {
    field: "name",
    headerName: "User Name",
    width: 300,
    headerClassName: "header-bold",
  },
  {
    field: "email",
    headerName: "Email",
    width: 500,
    headerClassName: "header-bold",
  },
  {
    field: "role",
    headerName: "Role",
    width: 250,
    headerClassName: "header-bold",
  },
];

const AccessControlTable = ({ accessControlData }) => {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="access-control-table">
      <Paper className="access-control-table-container">
        <DataGrid
          rows={accessControlData}
          columns={columns}
          pageSize={pageSize}
          paginationMode="client"
          rowCount={accessControlData.length}
          page={page}
          onPageChange={(newPage) => handlePageChange(newPage)}
          pagination
          pageSizeOptions={[10]}
          getRowId={(row) => row.id}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              fontSize: "22px",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "18px",
            },
          }}
        />
      </Paper>
    </div>
  );
};
export default AccessControlTable;

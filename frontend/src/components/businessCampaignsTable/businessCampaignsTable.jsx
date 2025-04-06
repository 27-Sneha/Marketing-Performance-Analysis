import { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import { BusinessContext } from "../../context/businessContext";
import "./businessCampaignsTable.css";

const columns = [
  {
    field: "campaign_id",
    headerName: "ID",
    width: 70,
    headerClassName: "header-bold",
  },
  {
    field: "campaign_name",
    headerName: "Campaign Name",
    width: 250,
    headerClassName: "header-bold",
  },
  {
    field: "start_date",
    headerName: "Start Date",
    width: 180,
    headerClassName: "header-bold",
  },
  {
    field: "end_date",
    headerName: "End Date",
    width: 180,
    headerClassName: "header-bold",
  },
  {
    field: "clicks",
    headerName: "Clicks",
    width: 150,
    headerClassName: "header-bold",
  },
  {
    field: "reach",
    headerName: "Reach",
    width: 150,
    headerClassName: "header-bold",
  },
  {
    field: "return_on_ad_spend",
    headerName: "ROAS",
    width: 150,
    headerClassName: "header-bold",
  },
  {
    field: "click_through_rate",
    headerName: "CTR (%)",
    width: 130,
    headerClassName: "header-bold",
  },
  {
    field: "cost_per_click",
    headerName: "CPC ($)",
    width: 150,
    headerClassName: "header-bold",
  },
  {
    field: "conversions",
    headerName: "Conversions",
    width: 160,
    headerClassName: "header-bold",
  },
];

const BusinessCampaignsTable = () => {
  const { campaignTableDataFunction, activeBusiness } =
    useContext(BusinessContext);
  const [campaignTableData, setCampaignTableData] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchCampaignTableData = async () => {
      const response = await campaignTableDataFunction([
        "campaign_id",
        "campaign_name",
        "start_date",
        "end_date",
        "clicks",
        "reach",
        "return_on_ad_spend",
        "click_through_rate",
        "cost_per_click",
        "conversions",
      ]);
      if (response) {
        console.log("hsbdkuhirjgkh", response.data);
        setCampaignTableData(response.data);
      }
    };
    fetchCampaignTableData();
  }, [activeBusiness]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="campaign-table">
      <Typography fontSize="30px" fontWeight="bold">
        Campaigns Table
      </Typography>
      <Paper className="campaign-table-container">
        <DataGrid
          rows={campaignTableData}
          columns={columns}
          pageSize={pageSize}
          paginationMode="client"
          rowCount={campaignTableData.length}
          page={page}
          onPageChange={(newPage) => handlePageChange(newPage)}
          pagination
          pageSizeOptions={[10]}
          getRowId={(row) => row.campaign_id}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              fontSize: "20px",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "16px",
            },
          }}
        />
      </Paper>
    </div>
  );
};
export default BusinessCampaignsTable;

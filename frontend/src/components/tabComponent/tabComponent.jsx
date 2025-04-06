import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Box,
} from "@mui/material";
import { ShowChartOutlined, TableChartOutlined } from "@mui/icons-material";
import Business from "../business/business";
import BusinessCampaignsTable from "../businessCampaignsTable/businessCampaignsTable";
import { BusinessContext } from "../../context/businessContext";
import PrimaryButton from "../../globalComponent/primaryButton/primaryButton";
import oops from "../../assets/oops.png";
import "./tabComponent.css";

const TabComponent = () => {
  const {
    businesses,
    loading,
    objectives,
    activeBusiness,
    campaignTableDataFunction,
  } = useContext(BusinessContext);

  const [value, setValue] = useState(0);
  const [campaignName, setCampaignName] = useState([]);
  const [selectedObjectives, setSelectedObjectives] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaignName = async () => {
      const response = await campaignTableDataFunction([
        "campaign_id",
        "campaign_name",
        "campaign_objective",
      ]);
      if (response.data) {
        setCampaignName(response.data);
      }
    };
    fetchCampaignName();
  }, [activeBusiness]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredCampaigns = useMemo(() => {
    if (selectedObjectives.length === 0) {
      return campaignName;
    }
    return campaignName.filter(campaign =>
      selectedObjectives.includes(campaign.campaign_objective)
    );
  }, [campaignName, selectedObjectives]);

  const handleObjectiveChange = (event, newValue) => {
    setSelectedObjectives(newValue);
    if (newValue.length > 0) {
      setSelectedCampaigns(prevSelected => 
        prevSelected.filter(campaign => 
          newValue.includes(campaign.campaign_objective)
        )
      );
    } else {
      setSelectedCampaigns(prevSelected => [...prevSelected]);
    }
  };

  const handleCampaignChange = (event, newValue) => {
    setSelectedCampaigns(newValue);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      {loading ? (
        <Grid container className="link-now-container">
          <CircularProgress />
        </Grid>
      ) : businesses.length === 0 ? (
        <Grid container className="link-now-container">
          <Grid item>
            <img src={oops} alt="No businesses found" />
          </Grid>
          <Grid item>
            <Typography variant="h4">
              No Linked Businesses. Do you want to link one?
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/dashboard/link">
              <PrimaryButton text="Link Now" className="link-now-btn" />
            </Link>
          </Grid>
        </Grid>
      ) : (
        <Box > {/* Set a minimum width to ensure content doesn't wrap */}
          <Grid container className="tab-header-section" sx={{ flexWrap: "nowrap" }}>
            <Grid item xs={12} sm={5} sx={{ minWidth: "300px" }}>
              <div className="tab-container">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  sx={{ padding: "0 20px" }}
                >
                  <Tab
                    icon={<ShowChartOutlined />}
                    iconPosition="start"
                    label="Visualisation"
                    value={0}
                    className="tab-title"
                  />
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Tab
                    icon={<TableChartOutlined />}
                    iconPosition="start"
                    label="Table"
                    value={1}
                    className="tab-title"
                  />
                </Tabs>
              </div>
            </Grid>
            <Grid item xs={12} sm={7} sx={{ minWidth: "500px" }}>
              <Grid container className="campaign-selection-container" spacing={2} sx={{ flexWrap: "nowrap" }}>
                <Grid item xs={12} sm={5.5} md={5} sx={{ minWidth: "200px" }}>
                  <Autocomplete
                    multiple
                    options={objectives}
                    value={selectedObjectives}
                    onChange={handleObjectiveChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Objectives"
                        placeholder="Select objectives"
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={option}
                        />
                      ))
                    }
                    disableClearable
                    getOptionLabel={(option) => option}
                    ListboxProps={{
                      style: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5.5} md={5} sx={{ minWidth: "200px" }}>
                  <Autocomplete
                    multiple
                    options={filteredCampaigns}
                    value={selectedCampaigns}
                    onChange={handleCampaignChange}
                    getOptionLabel={(option) => option.campaign_name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Campaign Names"
                        placeholder="Select campaigns"
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option.campaign_name}
                          {...getTagProps({ index })}
                          key={option.campaign_id}
                        />
                      ))
                    }
                    disableClearable
                    ListboxProps={{
                      style: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.campaign_id === value.campaign_id
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {value === 0 && (
            <Business
              selectedCampaigns={selectedCampaigns}
              selectedObjectives={selectedObjectives}
              allCampaigns={selectedObjectives.length === 0}
            />
          )}
          {value === 1 && (
            <BusinessCampaignsTable
              selectedCampaigns={selectedCampaigns}
              selectedObjectives={selectedObjectives}
              allCampaigns={selectedObjectives.length === 0}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default TabComponent;
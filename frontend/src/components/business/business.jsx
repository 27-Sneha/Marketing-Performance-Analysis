import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import KpiCard from "../kpiCard/kpiCard";
import CustomLineChart from "../customLineChart/customLineChart";
import CustomPieChart from "../customPieChart/customPieChart";
import CustomAreaChart from "../customAreaChart/customAreaChart";
import CustomBarChart from "../customBarChart/customBarChart";
import { BusinessContext } from "../../context/businessContext";
import DatePickerComponent from "../../globalComponent/datePickerComponent/datePickerComponent";
import dayjs from "dayjs";
import "./business.css";

const Business = ({selectedCampaigns, selectedObjectives}) => {
  const {
    campaignStatusCount,
    campaignObjectiveCount,
    fetchInitialData,
    statsFunction,
    chartsFunction,
    activeBusiness,
  } = useContext(BusinessContext);

  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [areaChartData, setAreaChartData] = useState([]);
  const [statsData, setstatsData] = useState([
    {
      id: "campaign_count",
      title: "Total No. of Campaign",
      value: "0",
      start_date: null,
      end_date: null,
    },
    {
      id: "conversion_rate",
      title: "Conversion Rate",
      value: "0",
      start_date: null,
      end_date: null,
    },
    {
      id: "ad_spend",
      title: "Total Ad Spend",
      value: "0",
      start_date: null,
      end_date: null,
    },
    {
      id: "impressions",
      title: "Total Impression",
      value: "0",
      start_date: null,
      end_date: null,
    },
  ]);

  useEffect(() => {
    fetchInitialData();
    const fetchInitialStats = async () => {
      const response = await statsFunction([
        "campaign_count",
        "conversion_rate",
        "ad_spend",
        "impressions",
      ]);
      if (response.data) {
        setstatsData((prev) =>
          prev.map((item) => ({
            ...item,
            value: response.data[item.id],
          }))
        );
      }
    };
    fetchInitialStats();

    const fetchChartData = async () => {
      const startDate = dayjs().subtract(3, "month").format("YYYY-MM-DD");
      const endDate = dayjs().format("YYYY-MM-DD");

      const lineResponse = await chartsFunction(
        ["impressions", "clicks", "performance_date"],
        startDate,
        endDate,
        selectedCampaigns,
        selectedObjectives
      );
      if (lineResponse.status) {
        setLineChartData(lineResponse.data);
      } else {
        setLineChartData(null);
      }

      const barResponse = await chartsFunction(
        ["click_through_rate", "cost_per_click", "performance_date"],
        startDate,
        endDate,
        selectedCampaigns,
        selectedObjectives
      );
      if (barResponse.status) {
        setBarChartData(barResponse.data);
      } else {
        setBarChartData(null);
      }

      const areaResponse = await chartsFunction(
        ["spend", "conversions", "performance_date"],
        startDate,
        endDate,
        selectedCampaigns,
        selectedObjectives
      );
      if (areaResponse.status) {
        setAreaChartData(areaResponse.data);
      } else {
        setAreaChartData(null);
      }
    };
    fetchChartData();
  }, [activeBusiness, selectedCampaigns, selectedObjectives]);


  const handleStatsDateChange = async (id, [startDate, endDate]) => {
    const response = await statsFunction([id], startDate, endDate);
    console.log(response);
    if (response.status) {
      setstatsData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: response.data[id] } : item
        )
      );
    } else {
      console.log("errorrr", response);
    }
  };

  const handleLineChartDateChange = async (startDate, endDate) => {
    if (startDate != null && endDate != null) {
      const response = await chartsFunction(
        ["impressions", "clicks", "performance_date"],
        startDate,
        endDate,
        selectedCampaigns,
        selectedObjectives
      );
      if (response.status) {
        setLineChartData(response.data);
      } else {
        console.log("errorrr", response);
      }
    }
  };

  const handleBarChartDateChange = async (startDate, endDate) => {
    if (startDate != null && endDate != null) {
      const response = await chartsFunction(
        ["click_through_rate", "cost_per_click", "performance_date"],
        startDate,
        endDate,
        selectedCampaigns,
        selectedObjectives
      );
      if (response.status) {
        setBarChartData(response.data);
      } else {
        console.log("errorrr", response);
      }
    }
  };

  const handleAreaChartDateChange = async (startDate, endDate) => {
    if (startDate != null && endDate != null) {
      const response = await chartsFunction(
        ["spend", "conversions", "performance_date"],
        startDate,
        endDate,
        selectedCampaigns,
        selectedObjectives
      );
      if (response.status) {
        setAreaChartData(response.data);
      } else {
        console.log("errorrr", response);
      }
    }
  };

  const formattedCampaignStatusCount = campaignStatusCount.map((item) => ({
    ...item,
    status_count: parseInt(item.status_count, 10),
  }));
  const formattedCampaignObjectiveCount = campaignObjectiveCount.map(
    (item) => ({
      ...item,
      status_count: parseInt(item.status_count, 10),
    })
  );

  return (
    <Grid container className="business-container">
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {statsData.map((data) => (
            <Grid item xs={12} md={6} xl={3} key={data.id}>
              <KpiCard kpi={data} onDateChange={handleStatsDateChange} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="business-section-2">
          <Grid item xs={12} xl={5.9} className="business-linechart-section">
            <Grid container height="100%">
              <Grid item xs={6}>
                <Typography fontSize="30px">Impressions VS Clicks</Typography>
              </Grid>
              <Grid item xs={6}>
                <DatePickerComponent onDateChange={handleLineChartDateChange} />
              </Grid>
              <Grid item xs={12}>
                <CustomLineChart data={lineChartData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={5.9}>
            <Grid container className="business-piechart-container">
              <Grid
                item
                xs={12}
                sm={5.8}
                lg={5.8}
                className="business-piechart-item"
              >
                <Typography fontSize="30px">Status</Typography>
                <CustomPieChart
                  data={formattedCampaignStatusCount}
                  colors={["#00C853", "#F44336"]}
                  legendName="campaign_status"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={5.8}
                lg={5.8}
                className="business-piechart-item"
              >
                <Typography fontSize="30px">Objectives</Typography>
                <CustomPieChart
                  data={formattedCampaignObjectiveCount}
                  colors={[
                    "#2196F3",
                    "#00E676",
                    "#F44336",
                    "#FFE57F",
                    "#673AB7",
                    "#697586",
                    "#D81B60",
                    "#FB8C00",
                  ]}
                  legendName="campaign_objective"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="business-section-3">
          <Grid item xs={12} xl={5.9} className="business-section-3-item">
            <Grid container height="100%">
              <Grid item xs={6}>
                <Typography fontSize="30px">CTR VS CPC</Typography>
              </Grid>
              <Grid item xs={6}>
                <DatePickerComponent onDateChange={handleBarChartDateChange} />
              </Grid>
              <Grid item xs={12}>
                <CustomBarChart data={barChartData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={5.9} className="business-section-3-item">
            <Grid container height="100%">
              <Grid item xs={6}>
                <Typography fontSize="30px">Spends VS Conversions</Typography>
              </Grid>
              <Grid item xs={6}>
                <DatePickerComponent onDateChange={handleAreaChartDateChange} />
              </Grid>
              <Grid item xs={12}>
                <CustomAreaChart data={areaChartData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Business;

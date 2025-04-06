import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { marketingData } from '../data/marketingData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Charts = () => {
  const { campaigns, dailyMetrics } = marketingData;

  // Calculate total metrics for pie chart
  const totalMetrics = campaigns.reduce(
    (acc, campaign) => ({
      impressions: acc.impressions + campaign.impressions,
      clicks: acc.clicks + campaign.clicks,
      conversions: acc.conversions + campaign.conversions,
    }),
    { impressions: 0, clicks: 0, conversions: 0 }
  );

  const pieData = [
    { name: 'Impressions', value: totalMetrics.impressions },
    { name: 'Clicks', value: totalMetrics.clicks },
    { name: 'Conversions', value: totalMetrics.conversions },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Performance Analytics
      </Typography>
      <Grid container spacing={3}>
        {/* Daily Metrics Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Daily Performance Trends
            </Typography>
            <LineChart
              width={800}
              height={300}
              data={dailyMetrics}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="impressions" stroke="#8884d8" />
              <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
              <Line type="monotone" dataKey="conversions" stroke="#ffc658" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Campaign Performance Bar Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Campaign ROI Comparison
            </Typography>
            <BarChart
              width={400}
              height={300}
              data={campaigns}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="roi" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Metrics Distribution
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts; 
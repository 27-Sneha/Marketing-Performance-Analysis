import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { marketingData } from '../data/marketingData';

const MetricCard = ({ title, value, unit = '' }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
      backgroundColor: '#f5f5f5'
    }}
  >
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
    <Typography component="p" variant="h4">
      {value}{unit}
    </Typography>
  </Paper>
);

const Overview = () => {
  const { overview } = marketingData;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Campaigns"
            value={overview.totalCampaigns}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Ad Spend"
            value={`$${overview.totalAdSpend.toLocaleString()}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Impressions"
            value={overview.totalImpressions.toLocaleString()}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Average CTR"
            value={`${overview.averageCTR}%`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Average CPC"
            value={`$${overview.averageCPC}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Average ROI"
            value={`${overview.averageROI}x`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview; 
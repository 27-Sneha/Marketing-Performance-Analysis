import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { marketingData } from '../data/marketingData';

const CampaignMetrics = () => {
  const { campaigns } = marketingData;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Campaign Performance
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Campaign Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Impressions</TableCell>
              <TableCell align="right">Clicks</TableCell>
              <TableCell align="right">CTR (%)</TableCell>
              <TableCell align="right">CPC ($)</TableCell>
              <TableCell align="right">Conversions</TableCell>
              <TableCell align="right">ROI</TableCell>
              <TableCell>Date Range</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell component="th" scope="row">
                  {campaign.name}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={campaign.status}
                    color={campaign.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {campaign.impressions.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {campaign.clicks.toLocaleString()}
                </TableCell>
                <TableCell align="right">{campaign.ctr}%</TableCell>
                <TableCell align="right">${campaign.cpc}</TableCell>
                <TableCell align="right">
                  {campaign.conversions.toLocaleString()}
                </TableCell>
                <TableCell align="right">{campaign.roi}x</TableCell>
                <TableCell>
                  {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                  {new Date(campaign.endDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CampaignMetrics; 
import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Overview from './components/Overview';
import CampaignMetrics from './components/CampaignMetrics';
import Charts from './components/Charts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Overview />
          <Charts />
          <CampaignMetrics />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

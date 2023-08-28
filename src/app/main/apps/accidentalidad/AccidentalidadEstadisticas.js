import React, { useState } from 'react';
import { 
  Box,
  Stack, 
  Tab, 
  Tabs, 
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import Accidentabilidad from './tabsEstadisticas/Accidentabilidad';
import Actuaciones from './tabsEstadisticas/Actuaciones';

const tabLabelStyles = {
  FontFamily: 'Inter, serif',
  fontWeight: 'bold',
  color: 'black',
  textTransform: 'none',
  writingMode: 'vertical-rl',
  fontSize: '14px',
  height: '190px',
};

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          maxWidth: '50px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          '&$selected': {
            backgroundColor: '#9fccf8',
          },
        },
        textColorPrimary: tabLabelStyles.color,
      },
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Stack 
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Stack>
  )
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function AccidentalidadEstadisticas() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box className='flex flex-col'>
        <Stack direction={'row'} className='flex flex-1'>
          <Tabs
            orientation='vertical'
            value={tabValue}
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{
              borderRight: 1, 
              borderColor: 'divider', 
              '& .Mui-selected': {
                backgroundColor: '#9fccf8',
              },
              '& .MuiTab-root': {
                backgroundColor: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#9fccf8',
                },
              },
            }}
          >
            <Tab 
              label={<Typography 
                style={tabLabelStyles}
                sx={{transform: 'rotate(180deg)', marginRight: '35px'}}
                >Accidentabilidad</Typography>}
              style={tabLabelStyles}
              {...a11yProps(0)} 
            />
            <Tab 
              label={<Typography 
                style={tabLabelStyles}
                sx={{transform: 'rotate(180deg)', marginRight: '35px'}}
              >Actuaciones</Typography>}
              style={tabLabelStyles}
              {...a11yProps(1)} 
            />
          </Tabs>
          <TabPanel 
            value={tabValue} 
            index={0} 
            className='flex flex-1 justify-center max-h-145'>
            <Accidentabilidad />
          </TabPanel>
          <TabPanel 
            value={tabValue} 
            index={1}
            className='flex flex-1 justify-center w-max-170'
          >
            <Actuaciones />
          </TabPanel>
        </Stack>
      </Box>
    </ThemeProvider>
  )
};
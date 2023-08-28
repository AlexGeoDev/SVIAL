import React, { useState } from 'react';
import { 
  Box,
  Stack, 
  Tab, 
  Tabs, 
  Typography 
} from '@mui/material';
import PropTypes from 'prop-types';
import AccidentalidadMap from './AccidentalidadMap';
import ConsultaMapa from './tabs/ConsultaMapa';
import ConsultaTramo from './tabs/ConsultaTramo';
import ConsultaAmbito from './tabs/ConsultaAmbito';
import BarChart from './tabs/components/BarChart';
import PieChart from './tabs/components/PieChart';
import AccidentalidadEstadisticas from './AccidentalidadEstadisticas';

const tabLabelStyles = {
  fontWeight: 'bold', // Texto en negrilla
  color: 'black',     // Color de texto negro
};

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
  );
}

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

export default function AccidentalidadConsultas() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Box className='flex flex-col'>
      <Stack direction={'row'} className='flex flex-1'>
        <Tabs
          // className='border-1'
          orientation='vertical'
          value={tabValue}
          onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{ 
            borderRight: 1, 
            borderColor: 'divider', 
            minWidth: '170px', 
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
            label="Consulta por tramo" 
            style={tabLabelStyles}
            {...a11yProps(0)} 
          />
          <Tab 
            label="Consulta por ámbito" 
            style={tabLabelStyles}
            {...a11yProps(1)} 
          />
          <Tab 
            label="Consulta por mapa" 
            style={tabLabelStyles}
            {...a11yProps(2)} 
          />
        </Tabs>
        <TabPanel 
          value={tabValue} 
          index={0} 
          className='flex flex-1 justify-center max-h-145'>
          <ConsultaTramo />
        </TabPanel>
        
        <TabPanel 
          value={tabValue} 
          index={1}
          className='flex flex-1 justify-center w-max-170'
        >
          <ConsultaAmbito />
        </TabPanel>
        <TabPanel 
          value={tabValue} 
          index={2}>
          <ConsultaMapa />
        </TabPanel>
      </Stack>

      <Stack direction={'row'}>
        <Stack width={'50vw'}>
          <AccidentalidadMap />
        </Stack>
        <Stack direction={'row'} width={'50vw'} 
          justifyContent={'center'}
          alignItems={'center'}
        >
          <BarChart />
          <PieChart />
        </Stack>
      </Stack>

      <Stack className='flex flex-1'>
        <AccidentalidadEstadisticas />
      </Stack>
    </Box>
  );
}

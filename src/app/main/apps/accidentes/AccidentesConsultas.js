import React, { useState } from 'react';
import { 
  Box,
  Stack, 
  Tab, 
  Tabs, 
  Typography 
} from '@mui/material';
import PropTypes from 'prop-types';
import ConsultaAmbito from './tabs/tabsConsultas/ConsultaAmbito';
import ConsultaTramo from './tabs/tabsConsultas/ConsultaTramo';
import ConsultaMapa from './tabs/tabsConsultas/ConsultaMapa';
import AccidentesMap from './AccidentesMap';
import BarChart from './tabs/components/BarChart';
import PieChart from './tabs/components/PieChart';
import AccidentesEstadisticas from './AccidentesEstadisticas';
import AccidentesVariables from './AccidentesVariables';
import { useSelector } from 'react-redux';


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

export default function AccidentesConsultas() {
  const [tabValue, setTabValue] = useState(0);
  const tabsVisibles = useSelector((state) => state.accidentalidad.accidentalidad.showTabs);
  const mapVisible = useSelector((state) => state.accidentalidad.accidentalidadMap.showMap);
  const dataVisible = useSelector ((state) => state.accidentalidad.accidentalidadData.showData);
  const tablesVisible = useSelector ((state) => state.accidentalidad.accidentalidadTables.showTables);
  const tuneVisible = useSelector ((state) => state.apps.showTune);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Box className='flex flex-col'>
      {tabsVisibles && (
        <Stack direction={'row'} className='flex flex-1 border-1 border-black'>
          <Tabs
            orientation='vertical'
            value={tabValue}
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ 
              borderRight: 1, 
              borderColor: 'divider', 
              minWidth: '90px',
              width: {sm: '90px', md: '170px'},
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
      )}

      {tuneVisible && (
        <Stack className='border-1 border-black'>
          <AccidentesVariables />
        </Stack>
      )}

      <Stack direction={{sm: 'column', md: 'row'}}>
        {mapVisible && (
          <Stack width={{sm: '100vw', md: '50vw'}} className='border-1 border-black'>          
            <AccidentesMap />
          </Stack>
        )}
        {dataVisible && (
          <Stack 
            paddingY={6}
            width={{sm: '100vw', md: '50vw'}}
            direction={'row'} 
            alignItems={'center'}
            justifyContent={'center'}
            className='border-1 border-black'
          >
            <BarChart />
            <PieChart />
          </Stack>
        )}
      </Stack>

      {tablesVisible && (
        <Stack className='flex flex-1 items-center border-1 border-black'>
          <AccidentesEstadisticas />
        </Stack>
      )}
    </Box>
  );
}

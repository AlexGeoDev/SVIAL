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

export default function AccidentalidadConsultas() {
  const [tabValue, setTabValue] = useState(0);
  const tabsVisibles = useSelector((state) => state.tabs.showTabs);
  const mapVisible = useSelector((state) => state.maps.showMap);
  const dataVisible = useSelector((state) => state.data.showData);
  const tablesVisible = useSelector((state) => state.tables.showTables); 

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Box className='flex flex-col'>
      <Stack
        style={{
          border: tabsVisibles ? '1px solid black' : 0,
          resize: tabsVisibles ? 'vertical': 'none',
          overflow: 'auto',
          minHeight: tabsVisibles ? '200px' : 0,
          height: tabsVisibles ? 'auto' : 0,
        }}
      >
        {tabsVisibles && (
          <Stack direction={'row'} className='tabs flex flex-1'>
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
              className='flex flex-1 justify-center max-h-145'
            >
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
      </Stack>

      <Stack 
        direction={{sm: 'column', md: 'row'}} 
        style={{
          resizable: true,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {mapVisible && (
          <Stack 
            width={{sm: '100vw', md: '50vw'}}
            minHeight={'400px'}
            minWidth={'25vw'}
            className='border-1 border-black' 
            sx={{
              overflow: 'auto',
              resize: 'both',
            }}
          >
            <AccidentalidadMap />
          </Stack>
        )}
        {dataVisible && (
          <Stack 
            width={{sm: '100vw', md: '50vw'}}
            minWidth={{md: '30vw'}}
            minHeight={'400px'}
            padding={2}
            direction={'row'} 
            alignItems={'center'}
            justifyContent={'center'}
            className='border-1 border-black'
            style={{
              resize: 'both',
              overflow: 'auto',
            }}
          >
            <BarChart />
            <PieChart />
          </Stack>
        )}
      </Stack>

      <Stack 
        style={{
          border: tablesVisible ? '1px solid black' : 0,
          resize: tablesVisible ? 'vertical': 'none',
          overflow: 'auto',
          marginBottom: '1px',
          minHeight: tablesVisible ? '200px' : '0px',
        }}>
        {tablesVisible && (
          <Stack className='flex flex-1'>
            <AccidentalidadEstadisticas />
          </Stack>
        )}
      </Stack>

    </Box>
  );
}
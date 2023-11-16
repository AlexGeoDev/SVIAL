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
import AccidentesEstadisticas from './AccidentesEstadisticas';
import AccidentesVariables from './AccidentesVariables';
import { useSelector } from 'react-redux';
import AccidentesGrafico from './AccidentesGrafico';

const tabLabelStyles = {
  fontWeight: 'bold',
  color: 'black',
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
  const [tramoGeoJson, setTramoGeoJson] = useState(null);
  const [puntosAccidentes, setPuntosAccidentes] = useState();
  const [accidentesData, setAccidentesData] = useState();
  const tabsVisibles = useSelector((state) => state.tabs.showTabs);
  const mapVisible = useSelector((state) => state.maps.showMap);
  const dataVisible = useSelector((state) => state.data.showData);
  const tablesVisible = useSelector((state) => state.tables.showTables);
  const tuneVisible = useSelector((state) => state.tune.showTune);
  const [variableEstudio, setVariableEstudio] = useState(null);


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box className='flex flex-col'>
      <Stack
        style={{
          border: tabsVisibles ? '1px solid black' : 0,
          resize: 'vertical',
          overflow: 'auto',
          minHeight: tabsVisibles ? '150px' : '0',
        }}
      >
        {tabsVisibles && (
          <Stack direction='row' className='flex flex-1'>
            <Tabs
              orientation='vertical'
              value={tabValue}
              onChange={handleChange}
              aria-label='Vertical tabs'
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                minWidth: '90px',
                width: { sm: '90px', md: '170px' },
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
                label='Consulta por tramo'
                style={tabLabelStyles}
                {...a11yProps(0)}
              />
              <Tab
                label='Consulta por ámbito'
                style={tabLabelStyles}
                {...a11yProps(1)}
              />
              <Tab
                label='Consulta por mapa'
                style={tabLabelStyles}
                {...a11yProps(2)}
              />
            </Tabs>
            <TabPanel
              value={tabValue}
              index={0}
              className='flex flex-1 justify-center max-h-145'
            >
              <ConsultaTramo 
                setTramoGeoJson={setTramoGeoJson}
                setPuntosAccidentes={setPuntosAccidentes}
                setAccidentesData={setAccidentesData}
              />
            </TabPanel>
            <TabPanel
              value={tabValue}
              index={1}
              className='flex flex-1 justify-center w-max-170'
            >
              <ConsultaAmbito />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ConsultaMapa />
            </TabPanel>
          </Stack>
        )}
      </Stack>

      {tuneVisible && (
        <Stack
          style={{
            border: '1px black solid',
            resize: 'vertical',
            overflow: 'auto',
            minHeight: tuneVisible ? '150px' : 0,
          }}
        >
          <AccidentesVariables setVariableEstudio={setVariableEstudio}/>
        </Stack>
      )}

      <Stack
        direction={{ sm: 'column', md: 'row' }}
        style={{
          resizable: true,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {mapVisible && (
          <Stack
            width={{ sm: '100vw', md: '100vw' }}
            minHeight='400px'
            minWidth='25vw'
            className='border-1 border-black'
            sx={{
              overflow: 'auto',
              resize: 'both',
            }}
          >
            <AccidentesMap 
              tramoGeoJson={tramoGeoJson}
              puntosAccidentes={puntosAccidentes}              
            />
          </Stack>
        )}
        {dataVisible &&(
          <Stack
            width={{ sm: '100vw', md: '100vw' }}
            minWidth={{ md: '30vw' }}
            minHeight='400px'
            padding={2}
            direction='row'
            alignItems='center'
            justifyContent='center'
            className='border-1 border-black'
            style={{
              resize: 'both',
              overflow: 'auto',
            }}
          >
            {puntosAccidentes && <AccidentesGrafico 
            puntosAccidentes={puntosAccidentes}
            variableEstudio = {variableEstudio}
            />}
          </Stack>
        )}
      </Stack>

      <Stack
        style={{
          border: tablesVisible ? '1px solid black' : 0,
          resize: tablesVisible ? 'vertical' : 'none',
          overflow: 'auto',
          marginBottom: '1px',
          minHeight: tablesVisible ? '200px' : '0px',
        }}
      >
        {tablesVisible && (
          <Stack className='flex flex-1 py-10 items-center border-1 border-black'>
            <AccidentesEstadisticas 
              accidentesData={accidentesData}
              puntosAccidentes={puntosAccidentes}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

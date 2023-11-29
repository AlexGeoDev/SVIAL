import React from 'react';
import { 
  Box,
  Stack, 
} from '@mui/material';
import AccidentalidadMap from './AccidentalidadMap';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import AccidentalidadEstadisticas from './AccidentalidadEstadisticas';
import { useSelector } from 'react-redux';
import Consultas from '../components/Consultas';

export default function AccidentalidadConsultas() {
  const mapVisible = useSelector((state) => state.maps.showMap);
  const dataVisible = useSelector((state) => state.data.showData);
  const tablesVisible = useSelector((state) => state.tables.showTables); 
  
  return (
    <Box className='flex flex-col'>
      <Consultas />
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
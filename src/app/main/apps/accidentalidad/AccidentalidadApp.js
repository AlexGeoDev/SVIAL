import React from 'react';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Stack } from '@mui/material';
import AccidentalidadHeader from './AccidentalidadHeader';
import AccidentalidadConsultas from './AccidentalidadConsultas';

const AccidentalidadApp = () => {
  return (
    <>
        <Stack>
          <AccidentalidadHeader />
          <AccidentalidadConsultas />
        </Stack>
    </>
  )
}

export default AccidentalidadApp;
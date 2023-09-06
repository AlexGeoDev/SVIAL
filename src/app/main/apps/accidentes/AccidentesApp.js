import { Stack, Typography } from '@mui/material';
import React from 'react';
import AccidentesHeader from './AccidentesHeader';
import AccidentesConsultas from './AccidentesConsultas';

const AccidentesApp = () => {
  return (
    <>
      <Stack>
        <AccidentesHeader />
        <AccidentesConsultas />
      </Stack>
    </>
  )
};

export default AccidentesApp;
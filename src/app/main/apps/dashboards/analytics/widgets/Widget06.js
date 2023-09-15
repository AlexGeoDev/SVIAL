import React from 'react';
import { Stack } from '@mui/material';

const Widget06 = () => {
  return (
    <Stack sx={{
      width: 390,
      borderRadius: '15px',
      backgroundColor: 'white',
      border: '2px #429df0 solid', 
    }}>
      <img
        style={{padding: '10px'}}
        src='assets/images/demarcacion.png' 
        alt='estadisticas del factor concurrente' />
    </Stack>
  )
}

export default Widget06;
import React from 'react';
import { Grid, Stack } from '@mui/material';

const Widget05 = () => {
  return (
    <Grid container    
      sm={11}
      // md={11}
      // lg={12}
      sx={{
        margin: '0 auto',
        // width: 390,
        borderRadius: '15px',
        backgroundColor: 'white',
        border: '2px #429df0 solid', 
      }}
    >
      <img
        style={{padding: '10px'}}
        src='assets/images/factorConcurrente.png' 
        alt='estadisticas del factor concurrente' />
    </Grid>
  )
}

export default Widget05;
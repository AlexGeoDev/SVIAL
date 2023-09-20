import React from 'react';
import { Grid, Stack } from '@mui/material';

const Widget03 = () => {
  return (
    <Grid container sm={11} md={12}
      sx={{
        margin: '0 auto',
        padding: '0px 24px 16px 24px',
        borderRadius: '15px',
        backgroundColor: 'white',
        border: '2px #429df0 solid', 
      }}
    >
      <Stack>
        <img
          alt='tabla estadistica' 
          src='assets/images/chart.jpg'
        />
      </Stack>
    </Grid>
  )
}

export default Widget03;
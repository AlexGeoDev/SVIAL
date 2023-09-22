import { Grid, Stack } from '@mui/material';
import React from 'react'

const Widget04 = () => {
  return (
    <Grid 
      sm={11}
      md={12}
      margin={'10px auto'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '15px',
        backgroundColor: 'white',
        border: '2px #429df0 solid', 
      }} 
    >
      <img 
        style={{ padding: '50px 0px'}} 
        src="assets/images/mapWithtags.png" 
        alt="mapa con cada estado y equiquetas"
      />
    </Grid>
  )
}

export default Widget04;
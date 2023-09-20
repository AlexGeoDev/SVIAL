import { Grid, Stack } from '@mui/material';
import React from 'react'

const Widget04 = () => {
  return (
    <Grid 
      sm={6.5}
      md={12}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '15px',
        backgroundColor: 'white',
        border: '2px #429df0 solid', 
      }} 
    >
      <img 
        style={{width: '450px', padding: '50px 0px'}} 
        src="assets/images/mapWithtags.png" 
        alt="mapa con cada estado y equiquetas"
      />
    </Grid>
  )
}

export default Widget04;
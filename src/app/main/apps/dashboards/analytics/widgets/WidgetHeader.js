import React from 'react';
import Typography from '@mui/material/Typography'
import { Box, Grid, Stack, useMediaQuery } from '@mui/material';

const WidgetHeader = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:900px)');

  const titleVariant = isSmallScreen ? 'h6' : isMediumScreen ? 'h6' : 'h4';
  const title2Variant = isSmallScreen ? 'h4' : isMediumScreen ? 'h3' : 'h2';
  return (
    <Box 
      paddingY={3}
      alignItems={'center'}
      justifyContent={'space-around'}
      sx={{backgroundColor: 'white'}}
      sm={4}
      className='flex flex-1 flex-row px-10'
    >
      <Grid 
        width={450}
        maxWidth={450}
        direction={{sm: 'column', md: 'row'}} 
        className='flex justify-around items-center' 
      >
        <Typography variant={title2Variant} fontWeight={'bold'}>SVIAL</Typography>
      </Grid>

      <Stack direction={'row'} spacing={2} alignItems={'center'} marginLeft={{md: 5, lg: 1}}>
        <Grid sm={9} md={11}>
          <Typography 
            variant={titleVariant}
            fontWeight={'bold'} 
            maxWidth={'730px'}
            className='flex flex-1 items-center '>
            Resúmen de la accidentalidad mortal a 24 horas de la RCE. Año 2023.
          </Typography>
        </Grid>
      </Stack>
    </Box>
  )
}

export default WidgetHeader;
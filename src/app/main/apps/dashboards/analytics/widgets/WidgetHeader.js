import React from 'react';
import Typography from '@mui/material/Typography'
import { Box, Divider, Grid, Stack, useMediaQuery } from '@mui/material';
import ReportGmailerrorredTwoToneIcon from '@mui/icons-material/ReportGmailerrorredTwoTone';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

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

        {/* <Divider orientation='vertical' flexItem/> */}

        {/* <Stack 
          spacing={1}
          marginTop={{sm: 1, md: 0}} 
          alignItems={'space-between'} 
          justifyContent={'space-between'}
        >
          <Stack width={{sm: 142, lg: 215}}>
            <img src='assets/images/logos/logo.png' alt='logo ministreio de transporte' />
          </Stack>
          <Stack mt={1.5} width={{sm: 75, lg: 114}}>
            <img src='assets/images/logos/prointec.png' alt='log prointec' />
          </Stack>
        </Stack> */}
      </Grid>

      <Stack direction={'row'} spacing={2} alignItems={'center'} marginLeft={{md: 5, lg: 1}}>
        {/* <ReportProblemOutlinedIcon 
          sx={{
            width: {sm: '60px', md: '80px'},
            height: {sm: '60px', md: '80px'},
            fontWeight: 'light !important',
          }}
        />
        <CampaignOutlinedIcon
          sx={{
            width: {sm: '60px', md: '80px'},
            height: {sm: '60px', md: '80px'},
            fontWeight: 'light !important',
          }}
        /> */}
        <Grid sm={9} md={11}>
          <Typography 
            variant={titleVariant}
            fontWeight={'bold'} 
            maxWidth={'730px'}
            className='flex flex-1 items-center '>
            Resúmen de la accidentalidad mortal en la Red de Carreteras de Estado. Año 2023
          </Typography>
        </Grid>
      </Stack>
    </Box>
  )
}

export default WidgetHeader;
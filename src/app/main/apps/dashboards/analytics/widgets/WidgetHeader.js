import React from 'react';
import Typography from '@mui/material/Typography'
import { Box, Divider, Grid, Stack } from '@mui/material';
import ReportGmailerrorredTwoToneIcon from '@mui/icons-material/ReportGmailerrorredTwoTone';

const WidgetHeader = () => {
  return (
    <Box 
      paddingY={3}
      alignItems={'center'}
      justifyContent={'space-around'}
      sx={{backgroundColor: 'white'}}
      className='flex flex-1 flex-row px-10'
    >
      <Grid className='flex flex-row justify-around items-center' maxWidth={450} width={450}>
        <Typography variant="h2" fontWeight={'bold'}>SVIAL</Typography>

        <Divider orientation='vertical' flexItem/>

        <Stack  alignItems={'space-between'} justifyContent={'space-between'}>
          <Stack>
            <img width={215} src='assets/images/logos/logo.png' alt='logo ministreio de transporte' />
          </Stack>
          <Stack mt={1.5}>
            <img width={114} src='assets/images/logos/prointec.png' alt='log prointec' />
          </Stack>
        </Stack>
      </Grid>

      <Stack direction={'row'}>
        <ReportGmailerrorredTwoToneIcon 
          style={{
            marginRight: 2,
            width: '80px', 
            height: '80px', 
            fontWeight: 'light !important',
          }}
        />
        <Typography 
          variant="h4"
          fontWeight={'bold'} 
          maxWidth={'730px'}
          className='flex flex-1 items-center '>
          Resúmen de la evolución de la accidentabilidad de la Red de Carreteras del Estado
        </Typography>
      </Stack>
    </Box>
  )
}

export default WidgetHeader;
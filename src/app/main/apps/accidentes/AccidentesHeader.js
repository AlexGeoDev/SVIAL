import React from 'react';
import { Grid, Stack, TextField, Typography, Button, useMediaQuery } from '@mui/material';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { styled } from '@mui/system';

const HeaderContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: '#9ecdf8',
  height: '78px',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(0, 2),
}));

const ReportButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#c0c0c0',
  color: 'black',
  maxHeight: '44px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  '& img': {
    width: 20,
    marginLeft: theme.spacing(1),
  },
}));

const AccidentesHeader = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:900px)');

  const titleVariant = isSmallScreen ? 'h6' : isMediumScreen ? 'h6' : 'h4';
  return (
    <HeaderContainer height={{sm: 100}} className='flex border-1 border-black'>
      <Stack direction="row" width="30vw" className="flex items-center" spacing={1}>
        <TaxiAlertIcon style={{ fontSize: '34px', color: 'white' }} />
        <Typography variant={titleVariant} color="initial" style={{ fontWeight: 'bold', height: '36px' }}>
          Accidentes
        </Typography>
      </Stack>

      <Grid className="flex flex-1" justifyContent="space-around" alignItems={'center'}>
        <TextField
          id="outlined-basic"
          label="Aviso:"
          variant="filled"
          size="small"
          style={{ backgroundColor: 'white', borderRadius: '5px', width: '24vw' }}
        />
        <Grid 
          height={{sm: 100}}
          direction={{sm: 'column', lg: 'row'}} 
          sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}} 
        >
          <Button
            width={135}
            variant="contained"
            endIcon={<SearchIcon />}
            sx={{ backgroundColor: '#439cf0', maxHeight: '44px', borderRadius: '4px', marginX: 1 }}
          >
            CONSULTAR
          </Button>
          <Button
            variant="contained"
            endIcon={<BackspaceIcon />}
            sx={{ backgroundColor: '#cfe6fa', maxHeight: '44px', borderRadius: '4px', minWidth: 135, marginX: 1 }}
          >
            LIMPIAR
          </Button>
        </Grid>
        <Grid
          height={{sm: 100}}
          direction={{sm: 'column', lg: 'row'}} 
          sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}} 
        >
          <ReportButton variant="contained" aria-label="download" sx={{marginX: 1}}>
            <DownloadIcon />
            <img src="assets/images/icons/pdfIcon.png" alt="PDF Icon" />
          </ReportButton>
          <ReportButton variant="contained" aria-label="download" sx={{marginX: 1}}>
            <DownloadIcon />
            <img src="assets/images/icons/excelIcon.png" alt="Excel Icon" />
          </ReportButton>
        </Grid>
      </Grid>
    </HeaderContainer>
  );
}

export default AccidentesHeader;

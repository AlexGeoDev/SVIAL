// import React from 'react';
// import ReportIcon from '@mui/icons-material/Report';
// import SearchIcon from '@mui/icons-material/Search';
// import DownloadIcon from '@mui/icons-material/Download';
// import BackspaceIcon from '@mui/icons-material/Backspace';
// import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
// import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
// import { Box, borderRadius } from '@mui/system';
// import { Button, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
// import { Fingerprint } from '@mui/icons-material';

// const AccidentalidadHeader = () => {
//   return (
//     <Grid alignItems={'center'} justifyContent={'space-around'}
//       px={2} 
//       className='flex'
//       style={{backgroundColor: '#9ecdf8',  height: '78px'}}
//       >
//         <Stack direction={'row'} width={'30vw'} className='flex items-center' spacing={1}>
//           <ReportIcon style={{ fontSize: '34px', color: 'white' }}/>
//           <Typography variant="h4" color="initial" style={{ fontWeight: 'bold', height: '36px' }}>
//             Accidentalidad
//           </Typography>
//         </Stack>

//         <Grid className='flex flex-1' justifyContent={'space-around'}>
//           <TextField id="outlined-basic" label="Aviso:" variant="filled" style={{ backgroundColor: 'white', borderRadius: '5px', height: '34px'}}/>
//           <Button variant='contained' endIcon={<SearchIcon />} sx={{backgroundColor: '#439cf0', maxHeight: '32px', borderRadius: '4px', }}>CONSULTAR</Button>
//           <Button variant='contained' endIcon={<BackspaceIcon />} sx={{backgroundColor: '#cfe6fa', maxHeight: '32px', borderRadius: '4px', }}>LIMPIAR</Button>
//           <Button variant='contained' aria-label="download"  style={{ color: 'black', backgroundColor: '#c0c0c0', maxHeight: '32px', borderRadius: '4px',}} >
//             <DownloadIcon />
//             <img src='assets/images/icons/pdfIcon.png' style={{width: 20, marginLeft: '10px'}} />
//           </Button>
//           <Button variant='contained' aria-label="download"  style={{ color: 'black', backgroundColor: '#c0c0c0', maxHeight: '32px', borderRadius: '4px',}} >
//             <DownloadIcon />
//             <img src='assets/images/icons/excelIcon.png' style={{width: 20, marginLeft: '10px'}} />
//           </Button>
//         </Grid>
//     </Grid>
//   )
// }

// export default AccidentalidadHeader;







import React from 'react';
import { Grid, Stack, TextField, Typography, Button } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { styled } from '@mui/system';

const HeaderContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: '#9ecdf8',
  height: '78px',
  // flexDirection: 'row',
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

const AccidentalidadHeader = () => {
  return (
    <HeaderContainer className='flex'>
      <Stack direction="row" width="30vw" className="flex items-center" spacing={1}>
        <ReportIcon style={{ fontSize: '34px', color: 'white' }} />
        <Typography variant="h4" color="initial" style={{ fontWeight: 'bold', height: '36px' }}>
          Accidentalidad
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
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          sx={{ backgroundColor: '#439cf0', maxHeight: '44px', borderRadius: '4px' }}
        >
          CONSULTAR
        </Button>
        <Button
          variant="contained"
          endIcon={<BackspaceIcon />}
          sx={{ backgroundColor: '#cfe6fa', maxHeight: '44px', borderRadius: '4px' }}
        >
          LIMPIAR
        </Button>
        <ReportButton variant="contained" aria-label="download">
          <DownloadIcon />
          <img src="assets/images/icons/pdfIcon.png" alt="PDF Icon" />
        </ReportButton>
        <ReportButton variant="contained" aria-label="download">
          <DownloadIcon />
          <img src="assets/images/icons/excelIcon.png" alt="Excel Icon" />
        </ReportButton>
      </Grid>
    </HeaderContainer>
  );
}

export default AccidentalidadHeader;

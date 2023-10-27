import React from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import { Grid, Stack } from '@mui/material';

function Widget01(){
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
      <Stack className='flex items-center mt-10'>
        <Typography variant="h6" gutterBottom>
          Resúmen de la evolución de la accidentalidad.
        </Typography>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{textAlign: 'center'}}>2023</TableCell>
              <TableCell sx={{textAlign: 'center'}}>2022</TableCell>
              <TableCell sx={{textAlign: 'center'}}>2021</TableCell>
              <TableCell sx={{textAlign: 'center'}}>2020</TableCell>
              <TableCell sx={{textAlign: 'center'}}>2019</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Fila 1 */}
            <TableRow>
              <TableCell 
                sx={{ 
                  width: '90px',
                  textAlign: 'center'
                }}
              >
                <Typography fontWeight={'bold'}>
                  Accidentes mortales
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>451</TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography color="#88dc65">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography color="#ff6961">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography>
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography color="#88dc65">
                (-34, -7.0%)
                </Typography>
              </TableCell>
            </TableRow>
            <Divider />

            {/* Fila 2 */}
            <TableRow>
              <TableCell sx={{textAlign: 'center'}}>
                <Typography fontWeight={'bold'}>
                  Víctimas mortales
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>500</TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography color="#88dc65">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography color="#ff6961">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography>
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                417 
                <br /> 
                <Typography color="#88dc65">
                (-34, -7.0%)
                </Typography>
              </TableCell>
            </TableRow>
            <Divider />

          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Widget01;
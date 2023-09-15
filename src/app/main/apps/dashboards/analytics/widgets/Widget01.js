import React from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';

function Widget01(){
  return (
    <Stack 
      width={800} 
      height={250}
      paddingX={3}
      sx={{
        borderRadius: '15px',
        border: '2px #429df0 solid', 
        backgroundColor: 'white',
      }} 
    >
      <Stack className='flex flex-1 items-center mt-10'>
        <Typography variant="h6" gutterBottom>
          Resúmen de la evolución de la accidentalidad
        </Typography>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>2023</TableCell>
              <TableCell>2022</TableCell>
              <TableCell>2021</TableCell>
              <TableCell>2020</TableCell>
              <TableCell>2019</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Fila 1 */}
            <TableRow>
              <TableCell>
                <Typography fontWeight={'bold'}>
                  Accidentes mortales
                </Typography>
              </TableCell>
              <TableCell>451</TableCell>
              <TableCell>
                417 
                <br /> 
                <Typography color="#88dc65">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell>
                417 
                <br /> 
                <Typography color="#ff6961">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell>
                417 
                <br /> 
                <Typography>
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell>
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
              <TableCell>
                <Typography fontWeight={'bold'}>
                  Víctimas mortales
                </Typography>
              </TableCell>
              <TableCell>500</TableCell>
              <TableCell>
                417 
                <br /> 
                <Typography color="#88dc65">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell>
                417 
                <br /> 
                <Typography color="#ff6961">
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell>
                417 
                <br /> 
                <Typography>
                (-34, -7.0%)
                </Typography>
              </TableCell>
              <TableCell>
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
    </Stack>
  );
}

export default Widget01;

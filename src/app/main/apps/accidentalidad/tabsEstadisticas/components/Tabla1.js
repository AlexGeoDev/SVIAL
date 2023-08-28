import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Tabla1 = () => {
  const rows = [
    { left: 'IP', right: 'IM', background: 'lightgray' },
    { left: '', right: '', background: 'white' },
    { left: 'Dato 1', right: 'Dato 2', background: 'lightgray' },
    { left: '', right: '', background: 'gray' },
    { left: 'Dato 3', right: 'Dato 4', background: 'lightgray' },
    { left: '', right: '', background: 'gray' },
  ];

  return (
    <div>
      <TableContainer component={Paper} elevation={0} variant="outlined" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant="h6">
        Autovía
      </Typography>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell style={{ fontWeight: 'bold', border: 1, background: 'white' }}>Columna 1</TableCell> */}
              {/* <TableCell style={{ fontWeight: 'bold', border: 1, background: 'white' }}>Columna 2</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} style={{ background: row.background }}>
                <TableCell style={{ border: 1 }}>{row.left}</TableCell>
                <TableCell style={{ border: 1 }}>{row.right}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tabla1;

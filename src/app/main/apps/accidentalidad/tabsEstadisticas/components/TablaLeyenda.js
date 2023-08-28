import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper
} from '@mui/material';

const TablaLeyenda = () => {
  const rows = [
    { left: 'Vía', right: 'Autovía' },
    { left: 'Zona', right: 'Interurbano' },
    { left: 'Alta', right: '2019' },
    { left: 'Longitud (Km)', right: '99' },
    { left: 'Longitud de cálculo año (Km)', right: '2021 - 27,6' },
    { left: 'Categoría IMD', right: '10.000 - 15.000' },
  ];

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table style={{ fontSize: '14px' }}>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                align="center"
                style={{ fontWeight: 'bold', border: 1, fontSize: '14px', width: '150px' }}
              >
                {row.left}
              </TableCell>
              <TableCell 
                align="center"
                style={{ border: 1, fontSize: '13px' }}
              >
                {row.right}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaLeyenda;

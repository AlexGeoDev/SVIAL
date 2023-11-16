// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';

// const data = [
//   ['', '', '', '', 'VM', 'HG', 'HL', '', '', 'N. VEHÍCULOS', 'VEHÍCULO 1', 'VEHÍCULO 2'],
//   ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3', 'K3', 'L3'],
//   ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3', 'K3', 'L3'],
//   ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4', 'K4', 'L4'],
//   ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5', 'K5', 'L5'],
// ];

// const AccidentesEstadisticas = () => {
//   return (
//     <div style={{marginTop: 10}}>
//       <Stack>
//         <Typography variant="body1" color="initial" style={{fontWeight: 'bold'}}>DATOS DE ACCIDENTES</Typography>
//       </Stack>
//       <TableContainer 
//         component={Paper} 
//         className='flex flex-1 justify-center items-center border-1 border-red'
//         sx={{width: '90vw', backgroundColor: 'white', marginTop: 1}}
//       >
//         <Table 
//           aria-label="simple table">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableCell>FECHA</TableCell>
//               <TableCell>CARRETERA</TableCell>
//               <TableCell>PK</TableCell>
//               <TableCell>PROVINCIA</TableCell>
//               <TableCell>LESIVIDAD</TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell>LUMINOSIDAD</TableCell>
//               <TableCell>FACTORES ATMOSFÉRICOS</TableCell>
//               <TableCell>VEHÍCULO IMPLICADO</TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row, rowIndex) => (
//               <TableRow key={rowIndex}>
//                 {row.map((cellValue, columnIndex) => (
//                   <TableCell key={columnIndex}>{cellValue}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default AccidentesEstadisticas;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const AccidentesEstadisticas = ({ puntosAccidentes }) => {
  if (!puntosAccidentes || puntosAccidentes.length === 0) {
    return <Typography>No hay datos disponibles</Typography>;
  }

  const firstAccidente = puntosAccidentes[0];

  if (!firstAccidente || !firstAccidente.properties) {
    return <Typography>No hay datos disponibles</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(firstAccidente.properties).map((property) => (
              <TableCell key={property}>{property}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {puntosAccidentes.map((accidente, index) => (
            <TableRow key={index}>
              {Object.values(accidente.properties).map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccidentesEstadisticas;

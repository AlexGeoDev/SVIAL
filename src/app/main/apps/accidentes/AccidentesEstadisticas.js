import React from "react";
import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const AccidentesEstadisticas = ({ puntosAccidentes }) => {
  console.log(puntosAccidentes ? ('puntosAccidentes desde tabla: ' + puntosAccidentes.features) : 'puntosAccidentes desde tabla: null');

  const PAF = puntosAccidentes;

  if (!PAF || PAF.features.length === 0) {
    return (
      <Stack 
        height={400} 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{textAlign: 'center'}}>No hay datos disponibles, para poder ver la tabla de atributos debe seleccionar: 
        <b><br /> carretera, <br /> PK inicio, <br /> PK fin, 
        <br /> Fecha inicio y Fecha fin</b></Typography>
      </Stack>
    );
  }

  const columns = Object.keys(PAF.features[0].properties).map((property) => ({
    flex: 1,
    minWidth: 200,
    field: property,
    headerAlign: 'center',
    headerName: property,
  }));

  const rows = PAF.features.map((feature, index) => ({
    id: index,
    ...feature.properties,
  }));

  return (
    <>
      <Typography variant="h4">Registro de accidentes</Typography>
      <Stack style={{ padding: '10px',  height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          // initialState={{
          //   pagination: {
          //     paginationModel: { page: 0, pageSize: 5 },
          //   },
          // }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        />
      </Stack>
    </>
  );
};

export default AccidentesEstadisticas;

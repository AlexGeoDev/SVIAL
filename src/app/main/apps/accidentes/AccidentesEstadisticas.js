import React from "react";
import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const AccidentesEstadisticas = () => {
  const puntosAccidentes = useSelector((state) => state.consultas.puntosAccidentes);

  if (!puntosAccidentes || puntosAccidentes.features.length === 0) {
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

  const columns = Object.keys(puntosAccidentes.features[0].properties).map((property) => ({
    flex: 1,
    minWidth: 200,
    field: property,
    headerAlign: 'center',
    headerName: property,
  }));

  const rows = puntosAccidentes.features.map((feature, index) => ({
    id: index,
    ...feature.properties,
  }));

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          padding: '10px',
          display: "flex",
          flexDirection: {md: 'column', lg: 'row'},
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <Stack>
          <Typography variant="h4">DATOS DE ACCIDENTES</Typography>
        </Stack>
        <Stack>
          Tabla resumen
        </Stack>

      </Stack>
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

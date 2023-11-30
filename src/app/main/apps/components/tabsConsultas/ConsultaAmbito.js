import React, { useEffect, useRef, useState } from "react";
import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  TextField,
  useMediaQuery,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import dataApiService from "app/services/dataApiService";

const ConsultaAmbito = () => {
  const [demarcacion, setDemarcacion] = useState([]);
  const [selectedDemarcacion, setSelectedDemarcacion] = useState("");

  const [provincias, setProvincias] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");

  const [tipoVia, setTipoVia] = useState([]);
  const [selectedTipoVia, setSelectedTipoVia] = useState("");

  const [carreteras, setCarreteras] = useState([]);
  const [selectedCarretera, setSelectedCarretera] = useState("");

  const [zonas, setZonas] = useState([]);
  const [selectedZonas, setSelectedZonas] = useState("");

  const [IMD, setIMD] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showErrorFecha, setShowErrorFecha] = useState(false);
  const isMounted = useRef(true);

  const handleDemarcacion = (e) => {
    setSelectedDemarcacion(
      demarcacion.filter((demarcacion) => {
        return demarcacion.id_demarcacion == e.target.value;
      })[0]
    );
    console.log("selectedDemarcacion: ", e.target.value);
  };
  const handleClearDemarcacion = () => {
    setSelectedDemarcacion("");
  };
  // --------------------------------------
  const handleProvincias = (e) => {
    setSelectedProvincia(e.target.value);
  };
  const handleClearProvincias = () => {
    setSelectedProvincia("");
  };
  // --------------------------------------
  const handleTipoVia = (e) => {
    setSelectedTipoVia(e.target.value);
  };
  const handleClearTipoVia = () => {
    setSelectedTipoVia("");
  };
  // --------------------------------------
  const handleCarretera = (e) => {
    setSelectedCarretera(e.target.value);
  };
  const handleClearCarretera = () => {
    setSelectedCarretera("");
  };
  // --------------------------------------
  const handleZonas = (e) => {
    setSelectedZonas(e.target.value);
  };
  const handleClearZonas = () => {
    setSelectedZonas("");
  };
  // --------------------------------------
  const handleIMD = (e) => {
    setIMD(e.target.value);
  };
  const handleClearIMD = () => {
    setIMD("");
  };
  // --------------------------------------
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleConsultar = () => {
    // Lógica para realizar la consulta con las fechas seleccionadas
    console.log("Fecha Inicial:", selectedStartDate);
    console.log("Fecha Final:", selectedEndDate);
  };

  const isMediumScreen = useMediaQuery(
    "(min-width: 1200px) and (max-width: 1300px)"
  );

  const formControlStyle = {
    width: isMediumScreen ? "140px" : "200px",
  };

  useEffect(() => {
    return () => {
      // Cuando el componente se desmonta, cambia el estado de isMounted a false
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const fecthDemarcacion = async () => {
      const dataDemarcacion = await dataApiService.get_demarcacion();
      if (isMounted.current) {
        setDemarcacion(dataDemarcacion);
      }
    };

    fecthDemarcacion();
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    const fecthProvincia = async () => {
      const dataProvincias = await dataApiService.get_provinciaName();
      // console.log('dataProvincias: ', dataProvincias );
      if (isMounted.current) {
        setProvincias(dataProvincias);
      }
    };

    fecthProvincia();
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    const fecthTipoVia = async () => {
      const dataTipoVia = await dataApiService.get_tipoVia();
      if (isMounted.current) {
        setTipoVia(dataTipoVia);
      }
    };

    fecthTipoVia();
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    const fetchCarreteras = async () => {
      try {
        const dataCarreteras = await dataApiService.get_carretera(
          selectedProvincia
        );
        if (isMounted.current) {
          setCarreteras(dataCarreteras);
        }
      } catch (error) {
        console.error("Error al obtener carreteras: ", error);
      }
    };

    fetchCarreteras();
  }, [selectedProvincia]);

  useEffect(() => {
    isMounted.current = true;
    const fetchZonas = async () => {
      const dataZona = await dataApiService.get_zonas();
      if (isMounted.current) {
        setZonas(dataZona);
      }
    };

    fetchZonas();
  }, [isMounted]);

  return (
    <Stack
      paddingY={1}
      sx={{
        width: "80vw",
        minHeight: "230px",
        marginRight: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: { sm: "column", lg: "row" },
      }}
    >
      <Stack
        spacing={2}
        width={{ sm: "70vw", lg: "55vw" }}
        direction={{
          sm: "row",
          md: "column",
        }}
        className="flex"
        justifyContent={"space-around"}
      >
        <Stack
          direction={{ sm: "column", md: "row" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack // Demarcacion
            sx={{
              minWidth: "200px",
              width: "min-content",
              maxWidth: "250px",
              marginLeft: { md: 1 },
              marginRight: { md: 1 },
              formControlStyle,
            }}
          >
            <Typography fontWeight={"bold"} sx={{ marginBottom: 1 }}>
              Demarcación:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Demarcación...</InputLabel>
              <Select
                size="small"
                labelId="Elegir demarcación"
                id="elegir-demarcación"
                value={selectedDemarcacion.id_demarcacion}
                label="Elegir demarcación"
                onChange={handleDemarcacion}
              >
                {demarcacion.map((demarcacion) => (
                  <MenuItem
                    key={demarcacion.id_demarcacion}
                    value={demarcacion.id_demarcacion}
                  >
                    {demarcacion.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack marginY={1}>
              {selectedDemarcacion && (
                <Chip
                  label={selectedDemarcacion.descripcion}
                  onDelete={handleClearDemarcacion}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: "#afdd95",
                    borderRadius: "15px",
                    fontWeight: "bold",
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack // Provincia
            sx={{
              minWidth: "200px",
              width: "min-content",
              maxWidth: "250px",
              marginX: { md: 1 },
              formControlStyle,
            }}
          >
            <Typography fontWeight={"bold"} mb={1}>
              Provincia:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Provincia...</InputLabel>
              <Select
                size="small"
                labelId="Elegir provincia"
                id="elegir-provincia"
                value={selectedProvincia}
                label="Elegir provincia"
                onChange={handleProvincias}
              >
                {provincias
                  .filter((provincia) => {
                    return (
                      provincia.id_demarcacion ==
                      selectedDemarcacion.id_demarcacion
                    );
                  })
                  .map((provincias) => (
                    <MenuItem
                      key={provincias.id}
                      value={provincias.descripcion}
                    >
                      {provincias.descripcion}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Stack my={1}>
              {selectedProvincia && (
                <Chip
                  label={selectedProvincia}
                  onDelete={handleClearProvincias}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: "#afdd95",
                    borderRadius: "15px",
                    fontWeight: "bold",
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack // Tipo de via
            sx={{
              minWidth: "200px",
              width: "min-content",
              maxWidth: "310px",
              marginX: { md: 1 },
              formControlStyle,
            }}
          >
            <Typography fontWeight={"bold"} mb={1}>
              Tipo de via:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Tipo de via...</InputLabel>
              <Select
                size="small"
                labelId="Elegir Tipo de via"
                id="elegir-TipoDeVia"
                value={selectedTipoVia}
                label="Elegir Tipo de via"
                onChange={handleTipoVia}
              >
                {tipoVia.map((tipoVia) => (
                  <MenuItem key={tipoVia.id} value={tipoVia.descripcion}>
                    {tipoVia.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack my={1}>
              {selectedTipoVia && (
                <Chip
                  label={selectedTipoVia}
                  onDelete={handleClearTipoVia}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: "#afdd95",
                    borderRadius: "15px",
                    fontWeight: "bold",
                  }}
                />
              )}
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ sm: "column", md: "row" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack // Carretera
            sx={{
              minWidth: "200px",
              width: "min-content",
              maxWidth: "250px",
              marginLeft: { md: 1 },
              marginRight: { md: 1 },
              formControlStyle,
            }}
          >
            <Typography fontWeight={"bold"} mb={1}>Carretera:</Typography>
            <FormControl fullWidth>
              <InputLabel>Carretera...</InputLabel>
              <Select
                size="small"
                labelId="Elegir carretera"
                id="elegir-carretera"
                value={selectedCarretera}
                label="Elegir carretera"
                onChange={handleCarretera}
              >
                {carreteras.map((carretera) => (
                  <MenuItem key={carretera.id} value={carretera.descripcion}>
                    {carretera.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack my={1}>
              {selectedCarretera && (
                <Chip
                  label={selectedCarretera}
                  onDelete={handleClearCarretera}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: "#afdd95",
                    borderRadius: "3px",
                    fontWeight: "bold",
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack // Zonas
            sx={{
              minWidth: "200px",
              width: "min-content",
              maxWidth: "250px",
              marginX: { md: 1 },
              formControlStyle,
            }}
          >
            <Typography fontWeight={"bold"} mb={1}>Zonas:</Typography>
            <FormControl fullWidth>
              <InputLabel>Zonas...</InputLabel>
              <Select
                size="small"
                labelId="Elegir zonas"
                id="elegir-zonas"
                value={selectedZonas}
                label="Elegir zonas"
                onChange={handleZonas}
              >
                {zonas.map((zonas) => {
                  <MenuItem key={zonas.id} value={zonas.descripcion}>
                    {zonas.descripcion}
                  </MenuItem>;
                })}
              </Select>
            </FormControl>
            <Stack my={1}>
              {selectedZonas && (
                <Chip
                  label={selectedZonas}
                  onDelete={handleClearZonas}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: "#afdd95",
                    borderRadius: "3px",
                    fontWeight: "bold",
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack // IMD
            sx={{
              minWidth: "200px",
              width: "min-content",
              maxWidth: "310px",
              marginX: { md: 1 },
              formControlStyle,
            }}
          >
            <Typography fontWeight={"bold"} mb={1}>IMD:</Typography>
            <FormControl fullWidth>
              <InputLabel>IMD...</InputLabel>
              <Select
                size="small"
                labelId="Elegir IMD"
                id="elegir-IMD"
                value={IMD}
                label="Elegir IMD"
                onChange={handleIMD}
              >
                <MenuItem value={"IMD 1"}>IMD 1</MenuItem>
                <MenuItem value={"IMD 2"}>IMD 2</MenuItem>
                <MenuItem value={"IMD 3"}>IMD 3</MenuItem>
              </Select>
            </FormControl>
            <Stack my={1}>
              {IMD && (
                <Chip
                  label={IMD}
                  onDelete={handleClearIMD}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: "#afdd95",
                    borderRadius: "3px",
                    fontWeight: "bold",
                  }}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Grid
        paddingY={2}
        sx={{
          display: "flex",
          flexDirection: { sm: "row", lg: "column" },
        }}
      >
        <Tooltip
          placement="top"
          open={showErrorFecha}
          title="La fecha final no puede ser inferior a la fecha de inicio"
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: { sm: "column", lg: "row" },
            }}
          >
            <Stack
              spacing={1}
              className="flex flex-1"
              sx={{
                paddingLeft: { sm: 1, lg: 0 },
                paddingRight: { sm: 1, lg: 0 },
              }}
            >
              <Stack
                spacing={1}
                direction={"row"}
                alignItems={"center"}
                className="flex flex-1"
              >
                <Typography fontWeight={"bold"} width={80} component="span">
                  Fecha inicio:
                </Typography>
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      views={["day"]}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          style={{ width: "140px" }}
                          size="small"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Stack>

              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography fontWeight={"bold"} width={80} component="span">
                  Fecha final:
                </Typography>
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      views={["day"]}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          style={{ width: "140px" }}
                          size="small"
                          onBlur={() => {
                            if (selectedEndDate < selectedStartDate) {
                              setShowErrorFecha(true);
                            } else {
                              setShowErrorFecha(false);
                            }
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
        </Tooltip>

        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: { sm: 0, lg: 1 },
            borderRadius: "8px",
            backgroundColor: "#0866ff",
          }}
          disabled={showErrorFecha}
        >
          <Typography>Consultar accidentes</Typography>
        </Button>
      </Grid>
    </Stack>
  );
};

export default ConsultaAmbito;

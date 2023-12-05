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
  Button,
  Grid,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { format } from "date-fns";
import dataApiService from "app/services/dataApiService";
import { useDispatch, useSelector } from "react-redux";
import {
  setCarreteras,
  setInputPkFin,
  setInputPkInicio,
  setPk_fin,
  setPk_inicio,
  setPuntosAccidentes,
  setSelectedCarretera,
  setSelectedEndDate,
  setSelectedProvincia,
  setSelectedStartDate,
  setTramoGeoJson,
} from "app/main/apps/store/consultasSlice";

const ConsultaTramo = () => {
  const dispatch = useDispatch();
  const carreteras = useSelector((state) => state.consultas.carreteras);
  const selectedProvincia = useSelector((state) => state.consultas.selectedProvincia);
  console.log('selectedProvincia: ', selectedProvincia);
  const selectedCarretera = useSelector((state) => state.consultas.selectedCarretera);

  const inputPkInicio = useSelector((state) => state.consultas.inputPkInicio); //valor que ingresa el usuario
  const inputPkFin = useSelector((state) => state.consultas.inputPkFin); //valor que ingresa el usuario
  const pkInicioHelper = useSelector((state) => state.consultas.pk_inicio); // valor que responde la API y que aparece en el textHelper y en placeholder
  const pkFinHelper = useSelector((state) => state.consultas.pk_fin); // valor que responde la API y que aparece en el textHelper y en placeholder

  const selectedStartDate = useSelector((state) => state.consultas.selectedStartDate);
  const selectedEndDate = useSelector((state) => state.consultas.selectedEndDate);
  
  const [disabled, setDisabled] = useState(true);
  const [showErrorFecha, setShowErrorFecha] = useState(false);
  const [showErrorPkInicio, setShowErrorPkInicio] = useState(false);
  const [showErrorPkFin, setShowErrorPkFin] = useState(false);
  const [disabledPuntos, setDisabledPuntos] = useState(true);  
  const [provincias, setProvincias] = useState([]);
  // const [carreteras, setCarreteras] = useState([]);
  
  const [pkInicioHelperText, setPkInicioHelperText] = useState("");
  const [pkFinHelperText, setPkFinHelperText] = useState("");
  const isMounted = useRef(true);

  const handleStartDateChange = (date) => dispatch(setSelectedStartDate(date));
  const handleEndDateChange = (date) => dispatch(setSelectedEndDate(date));

  const handleChangeProvincia = (e) => {

    dispatch(setSelectedProvincia(e.target.value))

    // const selectedValue = e.target.value;
    // const selectedProvince = provincias.find(
    //   (province) => province.descripcion === selectedValue
    // );

    // dispatch(setSelectedProvincia(selectedProvince));
    // dispatch(setSelectedCarretera(""));
    // selectedProvince ? fetchCarreteras() : fetchCarreterasSinProvincia();
  };
  const handleClearProvincia = () => {
    dispatch(setSelectedProvincia(""));
  };

  const handleChangeCarretera = (e) => {
    dispatch(setSelectedCarretera(e.target.value));
    setDisabled(false);
  };
  const handleClearCarretera = () => {
    dispatch(setSelectedCarretera(""));
    dispatch(setInputPkInicio(""));
    dispatch(setInputPkFin(""))
    dispatch(setPk_inicio(""))
    dispatch(setPk_fin(""))
  };
  const handlePkInicio = (e) => {
    dispatch(setInputPkInicio(e.target.value))
  };

  const handlePkFin = (e) => {
    dispatch(setInputPkFin(e.target.value));
  };

  const isMediumScreen = useMediaQuery(
    "(min-width: 1200px) and (max-width: 1300px)"
  );
  const formControlStyle = { width: isMediumScreen ? "160px" : "200px" };

  useEffect(() => {
    const fetchProvincias = async () => {
      const dataProvincias = await dataApiService.get_provinciaName();
      setProvincias(dataProvincias);
    }

    fetchProvincias();

    if (!selectedProvincia) {

      console.log('selectedProvincia is false')
      const fetchCarreterasSinProvincia = async () => {
        const dataCarreterasSinProvincia = await dataApiService.get_carreteraSinProvincia();
        console.log('dataCarreteras2: ', dataCarreterasSinProvincia)
        dispatch(setCarreteras(dataCarreterasSinProvincia))
        console.log('carreteras2: ', carreteras)
      }
  
      fetchCarreterasSinProvincia();
      
    } else {
      console.log('selectedProvincia is true')
      const fetchCarreteras = async () => {
        const dataCarreteras = await dataApiService.get_carretera();
        console.log('dataCarreteras1: ', dataCarreteras)
        dispatch(setCarreteras(dataCarreteras))
        console.log('carreteras1: ', carreteras)
      }
  
      fetchCarreteras();
    }
  },[selectedProvincia])

  // useEffect(() => {
  //   isMounted.current = true;

  //   const fetchProvincias = async () => {
  //     try {
  //       const dataProvincias = await dataApiService.get_provinciaName();
  //       isMounted.current && setProvincias(dataProvincias);
  //       console.log('provincias1: ', provincias)
  //     } catch (error) {
  //       console.error("Error al obtener las provincias: ", error);
  //     }
  //   };

  //   const fetchCarreterasSinProvincia = async () => {
  //     try {
  //       const dataCarreterasSinProvincia = await dataApiService.get_carreteraSinProvincia();
  //       isMounted.current && setCarreteras(dataCarreterasSinProvincia);
  //     } catch (error) {
  //       console.error("Error al obtener carreteras: ", error);
  //     }
  //   }

  //   // if (selectedCarretera) {
  //   //   fetchProvincias();
  //   // } else {
  //   //   fetchCarreterasSinProvincia();
  //   // }


  //     if (!selectedProvincia) {
  //     // Utiliza fetchCarreterasSinProvincia si no hay provincia seleccionada
  //     fetchCarreterasSinProvincia();
  //   } else {
  //     // Utiliza fetchCarreteras si hay provincia seleccionada
  //     fetchCarreteras();
  //   }
  // // }, [selectedProvincia, isMounted]);
  // }, [selectedCarretera, isMounted])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedCarretera &&
      inputPkInicio &&
      inputPkFin &&
      selectedStartDate &&
      selectedEndDate
    ) {
      const formattedStartDate = format(selectedStartDate, "yyyy-MM-dd");
      const formattedEndDate = format(selectedEndDate, "yyyy-MM-dd");

      const fetchPuntosAccidentes = async () => {
        try {
          const dataPuntosAccidentes = await dataApiService.getPuntosAccidentes(
            selectedCarretera,
            inputPkInicio,
            inputPkFin,
            formattedStartDate,
            formattedEndDate
          );
          dispatch(setPuntosAccidentes(dataPuntosAccidentes));
        } catch (e) {
          console.error("Error al obtener puntos de accidentes: ", e);
        }
      };

      fetchPuntosAccidentes();
    }
  };

  const fetchTramosGeom = async () => {
    try {
      const dataTramosGeom = await dataApiService.getTramosGeo(
        selectedCarretera,
        inputPkInicio,
        inputPkFin
      );

      if (dataTramosGeom) {
        setDisabledPuntos(false);
      }

      dispatch(setTramoGeoJson({
        data: dataTramosGeom,
        visible: true,
      }));
    } catch (e) {
      console.error("Error al obtener tramos geográficos: ", e);
    }
  };

  useEffect(() => () => (isMounted.current = false), []);

  // useEffect(() => {
  //   isMounted.current = true;
  //   const fetchProvinciaName = async () => {
  //     try {
  //       const dataProvincias = await dataApiService.get_provinciaName();
  //       isMounted.current && setProvincias(dataProvincias);
  //     } catch (error) {
  //       console.error("Error al obtener provincias: ", error);
  //     }
  //   };

  //   fetchProvinciaName();
  // }, []);

  // useEffect(() => {
  //   isMounted.current = true;

  //   const fetchCarreterasSinProvincia = async () => {
  //     try {
  //       const dataCarreterasSinProvincia =
  //         await dataApiService.get_carreteraSinProvincia();
  //       isMounted.current && setCarreteras(dataCarreterasSinProvincia);
  //     } catch (error) {
  //       console.error("Error al obtener carreteras: ", error);
  //     }
  //   };

  //   if (!selectedProvincia) {
  //     // Utiliza fetchCarreterasSinProvincia si no hay provincia seleccionada
  //     fetchCarreterasSinProvincia();
  //   } else {
  //     // Utiliza fetchCarreteras si hay provincia seleccionada
  //     fetchCarreteras();
  //   }
  // }, [selectedProvincia, isMounted]);

  // useEffect(() => {
  //   isMounted.current = true;
  //   const fetchTramosPorCarretera = async () => {
  //     try {
  //       if (selectedCarretera) {
  //         const dataTramo = await dataApiService.getTramosPorCarretera(
  //           selectedCarretera,
  //           selectedProvincia.descripcion
  //         );
  //         dispatch(setPk_inicio(dataTramo[0]?.min));
  //         dispatch(setPk_fin(dataTramo[0]?.max));

  //         if (dataTramo && dataTramo.length > 0) {
  //           setPkInicioHelperText(dataTramo[0].min);
  //           setPkFinHelperText(dataTramo[0].max);
  //         } else {
  //           setPkInicioHelperText("");
  //           setPkFinHelperText("");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener tramos por carretera: ", error);
  //     }
  //   };

  //   fetchTramosPorCarretera();
  // }, [selectedCarretera, isMounted]);

  useEffect(() => {
    isMounted.current = true;

    const fetchTramosPorCarretera = async () => {
      try {
        if (selectedCarretera) {
          const dataTramo = await dataApiService.getTramosPorCarretera(
            selectedCarretera,
            selectedProvincia.descripcion
          );
          dispatch(setPk_inicio(dataTramo[0]?.min));
          dispatch(setPk_fin(dataTramo[0]?.max));

          if (dataTramo && dataTramo.length > 0) {
            setPkInicioHelperText(dataTramo[0].min);
            setPkFinHelperText(dataTramo[0].max);
          } else {
            setPkInicioHelperText("");
            setPkFinHelperText("");
          }
        }
      } catch (error) {
        console.error("Error al obtener tramos por carretera: ", error);
      }
    };

    fetchTramosPorCarretera();
  }, [selectedCarretera, isMounted]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        marginLeft={3}
        sx={{
          minHeight: "150px",
          width: { sm: "85vw", md: "80vw" },
          display: "flex",
          flexDirection: {
            sm: "column",
            lg: "row",
          },
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Stack direction={"row"}>
          <Stack spacing={2} paddingY={2} paddingX={1} sx={formControlStyle}>
            <Typography fontWeight={"bold"} component="span">
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
                onChange={handleChangeProvincia}
              >
                {provincias.map((provincia) => (
                  <MenuItem key={provincia.id} value={provincia.descripcion}>
                    {provincia.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack>
              {selectedProvincia && (
                <Chip
                  label={selectedProvincia}
                  onDelete={() => {
                    handleClearProvincia();
                    handleClearCarretera();
                  }}
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

          {selectedProvincia ? `La provincia elegida es ${selectedProvincia}` : 'No se ha elegido provincia'}

          <Stack spacing={2} paddingY={2} paddingX={1} sx={formControlStyle}>
            <Typography fontWeight={"bold"} component="span">
              Carretera:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Carretera...</InputLabel>
              <Select
                size="small"
                labelId="Elegir carretera"
                id="elegir-carretera"
                value={selectedCarretera}
                label="Elegir carretera"
                onChange={handleChangeCarretera}
              >
                {carreteras
                  // .filter((carretera) => {
                  //   if (selectedProvincia) {
                  //     return carretera.id_provincia === selectedProvincia.id;
                  //   } else {
                  //     console.log('carretera.id_provincia: ', carretera.id_provincia)
                  //     return true;
                  //   }
                  .filter((carretera) => {
                    if (selectedProvincia) {
                      console.log('Selected Province ID:', selectedProvincia.id);
                      // console.log('Carretera Province ID:', carretera.id_provincia);
                      return carretera.id_provincia === selectedProvincia.id;
                    } else {
                      // console.log('No Province Selected - Carretera:', carretera);
                      return true;
                    }
                  })
                  .map((carretera) => (
                    <MenuItem
                      key={`key_${carretera.id_carretera}_${carretera.id_provincia}`}
                      value={carretera.descripcion}
                    >
                      {carretera.descripcion}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Stack>
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
        </Stack>

        <Stack
          className="pks-id"
          paddingY={2}
          paddingX={1}
          sx={{
            display: "flex",
            flexDirection: { sm: "row", lg: "column" },
            justifyContent: "space-evenly",
          }}
        >
          <Stack
            sx={{
              paddingLeft: { sm: 1, lg: 0 },
              paddingRight: { sm: 1, lg: 0 },
            }}
          >
            <FormControl className="pks-id">
              <Stack className="flex" spacing={1}>
                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                  <Tooltip title="Punto Kilometrico" placement="left">
                    <Typography fontWeight={"bold"} width={60}>
                      PK inicio:
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    open={showErrorPkInicio}
                    title="Error, el valor ingresado está fuera del rango permitido."
                  >
                    <TextField
                      disabled={disabled}
                      type="number"
                      inputProps={{ step: 0.1 }}
                      size="small"
                      placeholder={pkInicioHelper}
                      value={inputPkInicio}
                      onChange={handlePkInicio}
                      helperText={
                        selectedCarretera
                          ? `El valor mínimo permitido es ${parseFloat(
                              pkInicioHelperText
                            )} 
                            y el valor máximo es ${pkFinHelperText - 1}`
                          : null
                      }
                      onBlur={(e) => {
                        const inputValue = parseFloat(e.target.value);
                        if (
                          inputValue < parseFloat(pkInicioHelper) ||
                          inputValue > parseFloat(pkFinHelper - 1)
                        ) {
                          setShowErrorPkInicio(true);
                        } else {
                          setShowErrorPkInicio(false);
                        }
                      }}
                    />
                  </Tooltip>
                </Stack>

                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                  <Tooltip title="Punto Kilometrico" placement="left">
                    <Typography fontWeight={"bold"} width={60}>
                      PK final:
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    open={showErrorPkFin}
                    title="Error, el valor ingresado está fuera del rango permitido."
                  >
                    <TextField
                      disabled={disabled}
                      size="small"
                      type="number"
                      inputProps={{
                        step: 0.1,
                      }}
                      placeholder={pkFinHelper}
                      value={inputPkFin}
                      onChange={handlePkFin}
                      helperText={
                        selectedCarretera
                          ? `El valor mínimo permitido es ${
                              parseFloat(pkInicioHelperText) + 0.1
                            } 
                          y el valor máximo es ${parseFloat(pkFinHelperText)}`
                          : null
                      }
                      onBlur={(e) => {
                        const inputValue = parseFloat(e.target.value);
                        if (
                          inputValue < parseFloat(pkInicioHelper) + 0.1 ||
                          inputValue > parseFloat(pkFinHelper)
                        ) {
                          setShowErrorPkFin(true);
                        } else {
                          setShowErrorPkFin(false);
                        }
                      }}
                    />
                  </Tooltip>
                </Stack>
              </Stack>
            </FormControl>
          </Stack>
          <Button
            paddingX={1}
            type="button"
            variant="contained"
            sx={{
              marginTop: { sm: 0, lg: 1 },
              borderRadius: "8px",
              backgroundColor: "#0866ff",
            }}
            onClick={fetchTramosGeom}
            disabled={
              !inputPkInicio ||
              !inputPkFin ||
              showErrorPkInicio ||
              showErrorPkFin
            }
          >
            <Typography>Consultar Tramo</Typography>
          </Button>
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
                        disabled={disabledPuntos}
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
                        disabled={disabledPuntos}
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
            disabled={
              !selectedStartDate ||
              !selectedEndDate ||
              selectedEndDate < selectedStartDate
            }
          >
            <Typography>Consultar accidentes</Typography>
          </Button>
        </Grid>
      </Stack>
    </form>
  );
};

export default ConsultaTramo;

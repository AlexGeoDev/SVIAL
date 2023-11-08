import React, { useEffect, useRef, useState } from 'react';
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
  Grid,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider'; 
import dataApiService from 'app/services/dataApiService';

const ConsultaTramo = () => {
  const [provincias, setProvincias] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [carreteras, setCarreteras] = useState([]);
  const [selectedCarretera, setSelectedCarretera] = useState('');

  const [pk_inicio, setPk_inicio] = useState();
  const [selectedPk_inicio, setSelectedPk_inicio] = useState('');

  const [pk_fin, setPk_fin] = useState();
  const [selectedPk_fin, setSelectedPk_fin] = useState('');

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleChangeProvincia = (event) => {
    setSelectedProvincia(event.target.value);
  };

  const handleClearProvincia = () => {
    setSelectedProvincia('');
  };

  const handleChangeCarretera = (event) => {
    setSelectedCarretera(event.target.value);
  };

  const handleClearCarretera = () => {
    setSelectedCarretera('');
  };

  const handlePkInicio = (e) => {
    setSelectedPk_inicio(e.target.value);
    console.log('selectedPk_inicio: ', selectedPk_inicio);
  };

  const handlePkFin = (e) => {
    setSelectedPk_fin(e.target.value);
    console.log('selectedPk_fin: ', selectedPk_fin);
  };

  const isMediumScreen = useMediaQuery('(min-width: 1200px) and (max-width: 1300px)');

  const formControlStyle = {
    width: isMediumScreen ? '160px' : '200px', 
  };

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      // Cuando el componente se desmonta, cambia el estado de isMounted a false
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const fetchProvinciaName = async () => {
      try {
        const dataProvincias = await dataApiService.get_provinciaName();
        if (isMounted.current) {
          setProvincias(dataProvincias);
        }
      } catch (error) {
        console.error('Error al obtener provincias: ', error);
      }
    }

    fetchProvinciaName();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const fetchCarreteras = async () => {
      try {
        const dataCarreteras = await dataApiService.get_carretera();
        if (isMounted.current) {
          setCarreteras(dataCarreteras);
        }
      } catch (error) {
        console.error('Error al obtener carreteras: ', error);
      }
    }

    fetchCarreteras();
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    const fetchTramosPorCarretera = async () => {
      try {
        if (selectedCarretera) {
          const dataTramo = await dataApiService.getTramosPorCarretera(selectedCarretera);
          setPk_inicio(dataTramo[0].min);
          setPk_fin(dataTramo[0].max);
        }
      } catch (error) {
        console.error('Error al obtener tramos por carretera: ', error);
      }
    };

    fetchTramosPorCarretera();
  }, [selectedCarretera, isMounted]);

  useEffect(() => {
    if (selectedCarretera && selectedPk_inicio && selectedPk_fin) {
      const fetchTramosGeom = async () => {
        try {
          const dataTramosGeom = await dataApiService.getTramosGeo(
            selectedCarretera, 
            selectedPk_inicio, 
            selectedPk_fin
          );
          console.log("dataTramosGeom: ", dataTramosGeom);

        }catch(e) {
          console.error('Error al obtener tramos geográficos: ', e);
        }
      };
      fetchTramosGeom();
    }
  }, [selectedCarretera, selectedPk_inicio, selectedPk_fin]);

  return (
    <Stack
      marginLeft={3}
      sx={{
        width:{sm: '85vw', md: '80vw'},
        marginBottom: '10px',
        display: 'flex',
        flexDirection: {
          sm: 'column',
          lg: 'row',
        },
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Stack
        direction={'row'}
      >
        <Stack 
          spacing={2}
          paddingY={1}
          paddingX={1}
          sx={formControlStyle}
        >
          <Typography fontWeight={'bold'}>
            Provincia:
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Provincia...</InputLabel>
            <Select
              size='small'
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
                onDelete={handleClearProvincia}
                deleteIcon={
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                }
                style={{
                  backgroundColor:'#afdd95',
                  borderRadius: '3px',
                  fontWeight: 'bold',
                }}
              />
            )}
          </Stack>
        </Stack>

        <Stack 
          spacing={2}
          paddingX={1}
          paddingY={1}
          sx={formControlStyle}
        >
          <Typography fontWeight={'bold'}>
            Carretera:
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Carretera...</InputLabel>
            <Select
              size='small'
              labelId="Elegir carretera"
              id="elegir-carretera"
              value={selectedCarretera}
              label="Elegir carretera"
              onChange={handleChangeCarretera}
            >
              {carreteras.map((carretera) => (
                <MenuItem key={carretera.id} value={carretera.descripcion}>
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
                    backgroundColor:'#afdd95',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                  }}
                  />
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Stack className='flex px-20' spacing={1} justifyContent={'center'}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography fontWeight={'bold'}>
              PK inicio:
            </Typography>
            <TextField
              type="number"
              inputProps={{
                step: 0.1,
              }}
              size='small'
              placeholder={`valor mínimo ${pk_inicio}`}
              onChange={handlePkInicio}
            />
          </Stack>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography fontWeight={'bold'}>
              PK final:
            </Typography>
            <TextField 
              size='small'
              type='number'
              inputProps={{
                step: 0.1,
              }}
              placeholder={`valor máximo ${pk_fin}`}
              onChange={handlePkFin}
            />
          </Stack>
        </Stack>
      </Stack>
      
      <Grid sx={{
        display: 'flex',
        flexDirection: {sm: 'column', lg: 'row'},
        marginTop: {sm: 2, lg: 0},
      }}>
        <Stack className='flex flex-1 px-10' spacing={1}>
          <Stack direction={'row'} spacing={1} className='flex flex-1' alignItems={'center'}>
            <Typography fontWeight={'bold'} width={80}>
              Fecha inicio:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedStartDate}
                onChange={handleStartDateChange}
                views={['day']}
                renderInput={(props) => <TextField {...props} style={{ width: '140px' }} size='small'/>}
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={80}>
              Fecha final:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedEndDate}
                onChange={handleEndDateChange}
                views={['day']}
                renderInput={(props) => <TextField {...props} style={{ width: '140px' }} size='small'/>}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  )
};

export default ConsultaTramo;

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
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider'; 
import dataApiService from 'app/services/dataApiService';

const ConsultaAmbito = () => {
  const [demarcacion, setDemarcacion] = useState([]);
  const [selectedDemarcacion, setSelectedDemarcacion] = useState('');

  const [provincias, setProvincias] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState('');
  
  const [tipoVia, setTipoVia] = useState([]);
  const [selectedTipoVia, setSelectedTipoVia] = useState('');

  const [carreteras, setCarreteras] = useState([]);
  const [selectedCarretera, setSelectedCarretera] = useState('');

  const [zonas, setZonas] = useState([]);
  const [selectedZonas, setSelectedZonas] = useState('');

  const [IMD, setIMD] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const isMounted = useRef(true);

  const handleDemarcacion = (e) => {
    setSelectedDemarcacion(demarcacion.filter((demarcacion) => {
      return demarcacion.id_demarcacion == e.target.value;
    })[0]);
    console.log('selectedDemarcacion: ', e.target.value)
  }
  const handleClearDemarcacion = () => {
    setSelectedDemarcacion("");
  }
  // --------------------------------------
  const handleProvincias = (e) => {
    setSelectedProvincia(e.target.value);
  }
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
  }
  const handleClearZonas = () => {
    setSelectedZonas('');
  }
  // --------------------------------------
  const handleIMD = (e) => {
    setIMD(e.target.value);
  }
  const handleClearIMD = () => {
    setIMD('');
  }
  // --------------------------------------
  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isMediumScreen = useMediaQuery('(min-width: 1200px) and (max-width: 1300px)');

  const formControlStyle = {
    width: isMediumScreen ? '140px' : '200px', 
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
  }, [isMounted])

  useEffect(() => {
    isMounted.current = true;
    const fecthProvincia = async () => {
      const dataProvincias = await dataApiService.get_provinciaName();
      // console.log('dataProvincias: ', dataProvincias );
      if (isMounted.current) {
        setProvincias(dataProvincias);
      }
    }

    fecthProvincia();
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    const fecthTipoVia = async () => {
      const dataTipoVia = await dataApiService.get_tipoVia();
      if (isMounted.current) {
        setTipoVia(dataTipoVia);
      }
    }

    fecthTipoVia();
  }, [isMounted])

  useEffect(() => {
    isMounted.current = true;
    const fetchCarreteras = async () => {
      try {
        const dataCarreteras = await dataApiService.get_carretera(selectedProvincia);
        if (isMounted.current) {
          setCarreteras(dataCarreteras);
        }
      } catch (error) {
        console.error('Error al obtener carreteras: ', error);
      }
    }

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
        width: '80vw',
        minHeight: '230px',
        marginRight: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: {sm: 'column', lg: 'row'},
      }}
    >
      <Stack
        spacing={2}
        width={{sm: '70vw', lg: '55vw'}}
        direction={{
          sm: 'row',
          md: 'column',
        }}
        className='flex'
        justifyContent={'space-around'}
      >
        <Stack 
          direction={{sm: 'column', md: 'row'}}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

          }}
        >
          <Stack                    // Demarcacion
            sx={{
              minWidth: '200px',
              width: 'min-content',
              maxWidth: '250px',
              marginLeft: { md: 1 },
              marginRight: { md: 1 },              formControlStyle
            }}
          >
            <Typography fontWeight={'bold'} sx={{marginBottom: 1}}>
              Demarcación:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Demarcación...</InputLabel>
              <Select
                size='small'
                labelId="Elegir demarcación"
                id="elegir-demarcación"
                value={selectedDemarcacion.id_demarcacion}
                label="Elegir demarcación"
                onChange={handleDemarcacion}
              >
                {demarcacion.map((demarcacion) => (
                  <MenuItem key={demarcacion.id_demarcacion} value={demarcacion.id_demarcacion}>
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
                    backgroundColor:'#afdd95',
                    borderRadius: '15px',
                    fontWeight: 'bold',
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack                    // Provincia
            sx={{
              minWidth: '200px',
              width: 'min-content',
              maxWidth: '250px',
              marginX: {md: 1},
              formControlStyle
            }}
          >
            <Typography fontWeight={'bold'} mb={1}>
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
                onChange={handleProvincias}
              >
                {provincias.filter((provincia) => {
                  return provincia.id_demarcacion == selectedDemarcacion.id_demarcacion;
                }).map((provincias) =>(
                  <MenuItem key={provincias.id} value={provincias.descripcion}>
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
                    backgroundColor:'#afdd95',
                    borderRadius: '15px',
                    fontWeight: 'bold',
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack                    // Tipo de via
            sx={{
              minWidth: '200px',
              width: 'min-content',
              maxWidth: '310px',
              marginX: {md: 1},
              formControlStyle
            }}
          >
            <Typography fontWeight={'bold'} mb={1}>
              Tipo de via:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Tipo de via...</InputLabel>
              <Select
                size='small'
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
                    backgroundColor:'#afdd95',
                    borderRadius: '15px',
                    fontWeight: 'bold',
                  }}
                />
              )}
            </Stack>
          </Stack>          
        </Stack>

        <Stack spacing={{sm: 0, md: 1}} direction={{sm: 'column', md: 'row'}}
          sx={{
            display: 'flex',
            justifyContent: {sm: 'center', md: 'space-around'},
            alignItems: 'center',
          }}
        >
          <Stack                  // Carretera
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
                onChange={handleCarretera}
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
          <Stack                  // Zonas 
            sx={formControlStyle} 
          >
            <Typography fontWeight={'bold'}>
              Zonas:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Zonas...</InputLabel>
              <Select
                size='small'
                labelId="Elegir zonas"
                id="elegir-zonas"
                value={selectedZonas}
                label="Elegir zonas"
                onChange={handleZonas}
              >
                {zonas.map((zonas) => {
                  <MenuItem key={zonas.id} value={zonas.descripcion}>
                    {zonas.descripcion}
                  </MenuItem>
                })}
              </Select>
            </FormControl>
            <Stack>
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
                    backgroundColor:'#afdd95',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack                  // IMD 
            sx={formControlStyle} 
          >
            <Typography fontWeight={'bold'}>
              IMD:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>IMD...</InputLabel>
              <Select
                size='small'
                labelId="Elegir IMD"
                id="elegir-IMD"
                value={IMD}
                label="Elegir IMD"
                onChange={handleIMD}
              >
                <MenuItem value={'IMD 1'}>IMD 1</MenuItem>
                <MenuItem value={'IMD 2'}>IMD 2</MenuItem>
                <MenuItem value={'IMD 3'}>IMD 3</MenuItem>
              </Select>
            </FormControl>
            <Stack>
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
                    backgroundColor:'#afdd95',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                  }}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        marginTop={{sm: 2, lg: 0}}
        width={{sm: '60vw', lg: '45vw'}}
        alignItems={'center'}
        justifyContent={'center'} 
        className='flex'
        direction={'column'}
      >
        <Stack direction={'column'} className='flex' alignItems={'center'}>
          <Stack>
            <Typography fontWeight={'bold'}>
              Fecha inicio:
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                views={['day']}
                renderInput={(props) => <TextField {...props} style={{ width: '140px' }} size='small'/>}
              />
              <DatePicker
                value={selectedMonth}
                onChange={handleMonthChange}
                views={['month', 'year']}
                renderInput={(props) => <TextField {...props} style={{ width: '160px' }} size='small' placeholder="mm/yy"/>}
              />
              <DatePicker
                value={selectedYear}
                onChange={handleYearChange}
                views={['year']}
                renderInput={(props) => <TextField {...props} style={{ width: '100px' }} size='small'/>}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>

        <Stack direction={'column'} className='flex' alignItems={'center'} marginTop={2}>
          <Stack>
            <Typography fontWeight={'bold'}>
              Fecha final:
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                views={['day']}
                renderInput={(props) => <TextField {...props} style={{ width: '140px' }} size='small'/>}
              />
              <DatePicker
                value={selectedMonth}
                onChange={handleMonthChange}
                views={['year', 'month']}
                renderInput={(props) => <TextField {...props} style={{ width: '160px' }} size='small'/>}
              />
              <DatePicker
                value={selectedYear}
                onChange={handleYearChange}
                views={['year']}
                renderInput={(props) => <TextField {...props} style={{ width: '100px' }} size='small'/>}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </Stack>

    </Stack>
  )
};

export default ConsultaAmbito;
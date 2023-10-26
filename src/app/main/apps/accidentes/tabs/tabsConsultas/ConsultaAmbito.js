import React, { useState } from 'react';
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

const ConsultaAmbito = () => {
  const [demarcacion, setDemarcacion] = useState('')
  const [selectHighway, setSelectHighway] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [zonas, setZonas] = useState('');
  const [tipoDeVia, setTipoDeVia] = useState('');
  const [IMD, setIMD] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleDemarcacion = (event) => {
    setDemarcacion(event.target.value);
  }
  const handleClearDemarcacion = () => {
    setDemarcacion("");
  }
  // --------------------------------------
  const handleChangeHigway = (event) => {
    setSelectHighway(event.target.value);
  };
  const handleClearHighway = () => {
    setSelectHighway('');
  };
  // --------------------------------------
  const handleChangeLocation = (event) => {
    setSelectedLocation(event.target.value);
  };
  const handleClearLocation = () => {
    setSelectedLocation('');
  };
  // --------------------------------------
  const handleZonas = (event) => {
    setZonas(event.target.value);
  }
  const handleClearZonas = () => {
    setZonas('');
  }
  // --------------------------------------
  const handleTipoVia = (e) => {
    setTipoDeVia(e.target.value);
  }
  const handleClearTipoVia = () => {
    setTipoDeVia('');
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
        <Stack spacing={{sm: 0, md: 1}} direction={{sm: 'column', md: 'row'}}
          sx={{
            display: 'flex',
            justifyContent: {sm: 'center', md: 'space-around'},
            alignItems: 'center',
          }}
        >
          <Stack                    // Demarcacion
            sx={formControlStyle}
          >
            <Typography fontWeight={'bold'}>
              Demarcación:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Demarcación...</InputLabel>
              <Select
                size='small'
                labelId="Elegir demarcación"
                id="elegir-demarcación"
                value={demarcacion}
                label="Elegir demarcación"
                onChange={handleDemarcacion}
              >
                <MenuItem value={'Demarcacion 1'}>Demarcación 1</MenuItem>
                <MenuItem value={'Demarcacion 2'}>Demarcación 2</MenuItem>
                <MenuItem value={'Demarcacion 3'}>Demarcación 3</MenuItem>
              </Select>
            </FormControl>
            <Stack>
              {demarcacion && (
                <Chip 
                  label={demarcacion}
                  onDelete={handleClearDemarcacion}
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
          <Stack                    // Provincia
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
                value={selectedLocation}
                label="Elegir provincia"
                onChange={handleChangeLocation}
              >
                <MenuItem value={'Provincia 1'}>Provincia 1</MenuItem>
                <MenuItem value={'provincia 2'}>provincia 2</MenuItem>
                <MenuItem value={'provincia 3'}>provincia 3</MenuItem>
              </Select>
            </FormControl>
            <Stack>
              {selectedLocation && (
                <Chip 
                  label={selectedLocation}
                  onDelete={handleClearLocation}
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
          <Stack                    // Tipo de via
            sx={formControlStyle}
          >
            <Typography fontWeight={'bold'}>
              Tipo de via:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Tipo de via...</InputLabel>
              <Select
                size='small'
                labelId="Elegir Tipo de via"
                id="elegir-TipoDeVia"
                value={tipoDeVia}
                label="Elegir Tipo de via"
                onChange={handleTipoVia}
              >
                <MenuItem value={'TipoDeVia 1'}>Tipo de via 1</MenuItem>
                <MenuItem value={'TipoDeVia 2'}>Tipo de via 2</MenuItem>
                <MenuItem value={'TipoDeVia 3'}>Tipo de via 3</MenuItem>
              </Select>
            </FormControl>
            <Stack>
              {tipoDeVia && (
                <Chip 
                  label={tipoDeVia}
                  onDelete={handleClearTipoVia}
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
                value={selectHighway}
                label="Elegir carretera"
                onChange={handleChangeHigway}
              >
                <MenuItem value={'Carretera 1'}>Carretera 1</MenuItem>
                <MenuItem value={'Carretera 2'}>Carretera 2</MenuItem>
                <MenuItem value={'Carretera 3'}>Carretera 3</MenuItem>
              </Select>
            </FormControl>
            <Stack>
              {selectHighway && (
                  <Chip 
                    label={selectHighway}
                    onDelete={handleClearHighway}
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
                value={zonas}
                label="Elegir zonas"
                onChange={handleZonas}
              >
                <MenuItem value={'Zonas 1'}>Zonas 1</MenuItem>
                <MenuItem value={'Zonas 2'}>Zonas 2</MenuItem>
                <MenuItem value={'Zonas 3'}>Zonas 3</MenuItem>
              </Select>
            </FormControl>
            <Stack>
              {zonas && (
                <Chip 
                  label={zonas}
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
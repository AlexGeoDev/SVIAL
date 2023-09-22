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
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider'; 
import { Box } from '@mui/system';

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

  return (
    <Stack
      spacing={3}
      paddingY={1}
      direction={'row'}
      alignItems={'center'}
      className='flex flex-1'
      // width={'calc(100vw - 225px)'}
      justifyContent={'space-around'}
    >
      <Grid container className='flex flex-1' border={1} display={'flex'} flexDirection={{md: 'row'}}>
        <Grid 
          sx={{
            display: 'flex',
            flexDirection: {sm: 'row'},
          }}
        >
          <Stack                    // Demarcacion
            spacing={1}
            className='flex w-200 mx-5' 
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
          <Stack                    // Carretera
            spacing={1}
            className='flex w-200 mx-5'
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
        </Grid>
        <Grid 
          sx={{
            display: 'flex',
            flexDirection: {sm: 'row', md: 'column'},
          }}
        >
          <Stack                    // Provincia
            spacing={1}
            className='flex w-200 mx-5' 
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
          <Stack                    // Zonas 
            spacing={1}
            className='flex w-200 mx-5' 
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
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: {sm: 'row', md: 'column'},
          }}
        >
          <Stack                    // Tipo de via
            spacing={1}
            className='flex w-200 mx-5' 
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
          <Stack                    // IMD 
            spacing={1}
            className='flex w-200 mx-5' 
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
        </Grid>
      </Grid>

      <Stack
        spacing={1}
        maxWidth={'35vw'}
        alignItems={'center'}
        justifyContent={'center'} 
        className='flex flex-1'
        direction={{sm: 'column', md: 'row'}}
      >
        <Stack direction={{sm: 'column', lg: 'row'}} spacing={1} className='flex flex-1' alignItems={'center'}>
          <Typography fontWeight={'bold'} width={80}>
            Fecha inicio:
          </Typography>
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

        <Stack direction={{sm: 'column', lg: 'row'}} spacing={1} alignItems={'center'}>
          <Typography fontWeight={'bold'} width={80}>
            Fecha final:
          </Typography>
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
  )
};

export default ConsultaAmbito;
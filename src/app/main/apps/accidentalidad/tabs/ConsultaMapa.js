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
  Grid,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddLocationIcon from '@mui/icons-material/AddLocation';

const ConsultaMapa = () => {
  const [provinciaInicial, setProvinciaInicial] = useState('');
  const [provinciaFinal, setProvinciaFinal] = useState('');
  const [poblacionInicial, setPoblacionInicial] = useState('')
  const [poblacionFinal, setPoblacionFinal] = useState('')
  const [selectHighway, setSelectHighway] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleProvinciaInicial = (e) => {
    setProvinciaInicial(e.target.value)
  }
  const handleClearProvInicial = () => {
    setProvinciaInicial('');
  }
  // -----------------------------------------
  
  const handleProvinciaFinal = (e) => {
    setProvinciaFinal(e.target.value)
  }
  const handleClearProvFinal = () => {
    setProvinciaFinal('');
  }
  // -----------------------------------------

  const handlePoblacionInicial = (e) => {
    setPoblacionInicial(e.target.value)
  }
  const handleClearPobInicial = () => {
    setPoblacionInicial('');
  }
  // -----------------------------------------

  const handlePoblacionFinal = (e) => {
    setPoblacionFinal(e.target.value)
  }
  const handleClearPobFinal = () => {
    setPoblacionFinal('');
  }
  // -----------------------------------------
  
  const handleChangeHigway = (event) => {
    setSelectHighway(event.target.value);
  };
  const handleClearHighway = () => {
    setSelectHighway('');
  };
  // -----------------------------------------

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isMediumScreen = useMediaQuery('(min-width: 1200px) and (max-width: 1400px)');

  const formControlStyle = {
    width: isMediumScreen ? '130px' : '200px', 
  };

  return (
    <Stack
      sx={{
        width: '80vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: {sm: 3, lg: 0,},
        flexDirection: {sm: 'column', lg: 'row'},
      }}
    >
      <Stack direction={'row'} spacing={1} paddingX={1}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: {sm: 'column', md: 'row'},
            justifyContent: {sm: 'center', lg: 'space-evenly'}
          }}
        >
          <Stack direction={{sm: 'row', md: 'column'}} spacing={2}>
            <Stack
              spacing={1}
              // className='flex w-200' 
              paddingY={0.5}
              sx={formControlStyle}
            >
              <Typography fontWeight={'bold'}>
                Provincia inicial:
              </Typography>
              <Stack 
                spacing={0.5}
                direction={'row'} 
                className='flex flex-1 items-start'
              >
                <Stack spacing={0.5} className='flex flex-1'>
                  <FormControl fullWidth>
                    <InputLabel>Provincia...</InputLabel>
                    <Select
                      size='small'
                      labelId="Elegir provincia"
                      id="elegir-provincia"
                      value={provinciaInicial}
                      label="Elegir provincia"
                      onChange={handleProvinciaInicial}
                    >
                      <MenuItem value={'Provincia 1'}>Provincia 1</MenuItem>
                      <MenuItem value={'provincia 2'}>provincia 2</MenuItem>
                      <MenuItem value={'provincia 3'}>provincia 3</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack>
                    {provinciaInicial && (
                      <Chip 
                        label={provinciaInicial}
                        onDelete={handleClearProvInicial}
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
                <Stack className='h-36 justify-center items-center'>
                  <AddLocationIcon fontSize='large' style={{ color: '#4dd7fa' }} />
                </Stack>
              </Stack>
            </Stack>

            <Stack 
              spacing={1}
              // className='flex w-200' 
              paddingY={0.5}
              sx={formControlStyle}
            >
              <Typography fontWeight={'bold'}>
                Provincia final:
              </Typography>
              <Stack
                spacing={0.5}
                direction={'row'} 
                className='flex flex-1 items-start'
              >
                <Stack spacing={0.5} className='flex flex-1'>
                  <FormControl fullWidth>
                    <InputLabel>Provincia...</InputLabel>
                    <Select
                      size='small'
                      labelId="Elegir provincia"
                      id="elegir-provincia"
                      value={provinciaFinal}
                      label="Elegir provincia"
                      onChange={handleProvinciaFinal}
                    >
                      <MenuItem value={'Provincia 1'}>Provincia 1</MenuItem>
                      <MenuItem value={'provincia 2'}>provincia 2</MenuItem>
                      <MenuItem value={'provincia 3'}>provincia 3</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack>
                    {provinciaFinal && (
                      <Chip 
                        label={provinciaFinal}
                        onDelete={handleClearProvFinal}
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
                <Stack className='h-36 justify-center items-center'>
                  <AddLocationIcon fontSize='large' style={{ color: '#4dd7fa' }} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          
          <Stack direction={{sm: 'row', md: 'column'}} spacing={2}>
            <Stack 
              spacing={1}
              // className='flex w-200' 
              paddingY={0.5}
              sx={formControlStyle}
            >
              <Typography fontWeight={'bold'}>
                Población inicial:
              </Typography>
              <Stack
                spacing={0.5}
                direction={'row'} 
                className='flex flex-1 items-start'
              >
                <Stack spacing={0.5} className='flex flex-1'>
                  <FormControl fullWidth>
                    <InputLabel>Población...</InputLabel>
                    <Select
                      size='small'
                      labelId="Elegir Población"
                      id="elegir-Población"
                      value={poblacionInicial}
                      label="Elegir Población"
                      onChange={handlePoblacionInicial}
                    >
                      <MenuItem value={'Poblacion 1'}>Población 1</MenuItem>
                      <MenuItem value={'Poblacion 2'}>Población 2</MenuItem>
                      <MenuItem value={'Poblacion 3'}>Población 3</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack>
                    {poblacionInicial && (
                      <Chip 
                        label={poblacionInicial}
                        onDelete={handleClearPobInicial}
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
                <Stack className='h-36 justify-center items-center'>
                  <AddLocationIcon fontSize='large' style={{ color: '#4dd7fa' }} />
                </Stack>
              </Stack>
            </Stack>

            <Stack 
              spacing={1}
              // className='flex w-200' 
              paddingY={0.5}
              sx={formControlStyle}
            >
              <Typography fontWeight={'bold'}>
                Población final:
              </Typography>
              <Stack
                spacing={0.5}
                direction={'row'} 
                className='flex flex-1 items-start'
              >
                <Stack spacing={0.5} className='flex flex-1'>
                  <FormControl fullWidth>
                    <InputLabel>Población...</InputLabel>
                    <Select
                      size='small'
                      labelId="Elegir Población"
                      id="elegir-Población"
                      value={poblacionFinal}
                      label="Elegir Población"
                      onChange={handlePoblacionFinal}
                  o>
                      <MenuItem value={'Poblacion 1'}>Población 1</MenuItem>
                      <MenuItem value={'Poblacion 2'}>Población 2</MenuItem>
                      <MenuItem value={'Poblacion 3'}>Población 3</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack>
                    {poblacionFinal && (
                      <Chip 
                        label={poblacionFinal}
                        onDelete={handleClearPobFinal}
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
                <Stack className='h-36 justify-center items-center'>
                  <AddLocationIcon fontSize='large' style={{ color: '#4dd7fa' }} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction={{sm: 'row', md: 'column'}} spacing={2}>
            <Stack
              // className='flex w-200'
              paddingX={1}
              paddingY={0.5}
              sx={formControlStyle}
            >
              <Typography fontWeight={'bold'}>
                Carretera:
              </Typography>
              <Stack
                mt={1}
                spacing={0.5}
                direction={'row'} 
                className='flex flex-1 items-start'
              >
                <Stack spacing={0.5} className='flex flex-1'>
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
                <Stack className='h-36 justify-center items-center'>
                  <AddLocationIcon fontSize='large' style={{ color: '#4dd7fa' }} />
                </Stack>
              </Stack>
            </Stack>

            <Stack 
              spacing={1}
              // className='flex w-200' 
              paddingY={0.5}
              sx={formControlStyle}
            >
              {/* <Typography fontWeight={'bold'}>
                Población final:
              </Typography>
              <Stack
                spacing={0.5}
                direction={'row'} 
                className='flex flex-1 items-start'
              >
                <Stack spacing={0.5} className='flex flex-1'>
                  <FormControl fullWidth>
                    <InputLabel>Población...</InputLabel>
                    <Select
                      size='small'
                      labelId="Elegir Población"
                      id="elegir-Población"
                      value={poblacionFinal}
                      label="Elegir Población"
                      onChange={handlePoblacionFinal}
                  o>
                      <MenuItem value={'Poblacion 1'}>Población 1</MenuItem>
                      <MenuItem value={'Poblacion 2'}>Población 2</MenuItem>
                      <MenuItem value={'Poblacion 3'}>Población 3</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack>
                    {poblacionFinal && (
                      <Chip 
                        label={poblacionFinal}
                        onDelete={handleClearPobFinal}
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
                <Stack className='h-36 justify-center items-center'>
                  <AddLocationIcon fontSize='large' style={{ color: '#4dd7fa' }} />
                </Stack>
              </Stack> */}
            </Stack>
          </Stack>
        </Grid>
      </Stack>

      <Stack direction={{sm: 'column'}} marginRight={{lg: 5}}>
        <Stack direction={{sm: 'row'}} spacing={1} justifyContent={'center'} paddingY={1}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={60}>
              PK inicio:
            </Typography>
            <TextField size='small'/>
          </Stack>
          
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={60}>
              PK final:
            </Typography>
            <TextField size='small'/>
          </Stack>
        </Stack>

        <Stack spacing={1} margin={1}>
          <Stack direction={'row'} spacing={1} className='flex flex-1' alignItems={'center'}>
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

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
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

    </Stack>
  )
};

export default ConsultaMapa;

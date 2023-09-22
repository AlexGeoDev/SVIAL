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

const ConsultaTramo = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectHighway, setSelectHighway] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeLocation = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleClearLocation = () => {
    setSelectedLocation('');
  };

  const handleChangeHigway = (event) => {
    setSelectHighway(event.target.value);
  };

  const handleClearHighway = () => {
    setSelectHighway('');
  };

  return (
    <Stack
      spacing={2}
      direction={'row'}
      sx={{
        alignItems: 'center',
        margin: 'auto',
        height: {sm: '242px', lg: '144px'},        
      }}
      className='flex flex-1 items-center'
    >
      <Grid
        direction={{sm: 'column', lg: 'row'}}
        className='flex flex-1 px-10'>
        <Stack 
          spacing={2}
          className='flex w-200'
          paddingY={1}
          paddingX={1}
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

        <Stack 
          spacing={2}
          className='flex w-200'
          paddingX={1}
          paddingY={1}
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
      
      <Grid sx={{
        display: 'flex',
        flexDirection: {sm: 'column', lg: 'row'},
        }}>
        <Stack className='flex flex-1 px-20' spacing={1} justifyContent={'center'} paddingY={1}>
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

        <Stack className='flex flex-1 px-10' spacing={1}>
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
      </Grid>

    </Stack>
  )
};

export default ConsultaTramo;
import { Autocomplete, Button, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';

const AccidentesVariables = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const handleOptionChange = (index, newValue) => {
    setSelectedOptions(prevSelected => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = newValue;
      return updatedSelected;
    });
  };

  const handleButtonClick = index => {
    setActiveButton(index);
  };

  const theme = createTheme({
    typography: {
      button: {
        fontSize: '11px', // Ajusta el tamaño de fuente aquí
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='flex flex-1 border-1' style={{ overflowX: 'auto', width: '100%' }}>
        <Stack
          spacing={2}
          padding={2}
          direction={'row'}
          alignItems={'center'}
          className='flex flex-1'
          justifyContent={'space-around'}
        >
          {variables.map((film, index) => (
            <Stack spacing={2} paddingX={1} key={index}>
              <Button
                variant={activeButton === index ? 'contained' : 'outlined'}
                color='primary'
                sx={{ borderRadius: '8px' }}
                onClick={() => handleButtonClick(index)}
              >
                {film.title}
              </Button>
              <Autocomplete
                multiple
                id={`tags-outlined-${index}`}
                size='small'
                options={variables}
                getOptionLabel={(option) => option.title}
                value={selectedOptions[index] || []}
                onChange={(_, newValue) => handleOptionChange(index, newValue)}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          ))}
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default AccidentesVariables;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const variables = [
  { title: 'Tipología' },
  { title: 'Lesividad' },
  { title: 'Luminosidad' },
  { title: 'Factores atmosféricos' },
  { title: 'Vehículos implicados' },
  { title: 'Factor concurrente' },
  { title: 'Estado superficie' },
  { title: 'Intersección' },
];

import { Autocomplete, Button, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';

const AccidentesVariables = ({setVariableEstudio}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  //TODO: esto hay que sacarlo de la base de datos
  const variables = [
    { title: 'Anchura arcen' , column: "ARCEN", fktable : "anchura_arcen"},
    { title: 'Tipo accidente colisión', column: "TIPO_ACC_COLISION", fktable: "tipo_accidente_colision" },
    { title: 'Tipo accidente salida', column: "TIPO_ACC_SALIDA", fktable: "tipo_accidente_salida" },
    
  ];

  const handleOptionChange = (index, newValue) => {
    setSelectedOptions(prevSelected => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = newValue;
      return updatedSelected;
    });
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
    setVariableEstudio(variables[index]);
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
          {variables.map((varialbe, index) => (
            <Stack spacing={2} paddingX={1} key={index}>
              <Button
                variant={activeButton === index ? 'contained' : 'outlined'}
                color='primary'
                sx={{ borderRadius: '8px' }}
                onClick={() => handleButtonClick(index)}
              >
                {varialbe.title}
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
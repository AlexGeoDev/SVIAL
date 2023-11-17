import { Autocomplete, Button, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';

const AccidentesVariables = ({ setVariableEstudio, setMappingColors, puntosAccidentes }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeButton, setActiveButton] = useState(null);


  //TODO: esto hay que sacarlo de la base de datos
  const variables = [
    { title: 'Anchura arcen', column: "ARCEN", fktable: "anchura_arcen", estilo: 'Valores únicos'},
    { title: 'Tipo accidente colisión', column: "TIPO_ACC_COLISION", estilo: 'Valores únicos' },
    { title: 'Tipo accidente salida', column: "TIPO_ACC_SALIDA", fktable: "tipo_accidente_salida", estilo: 'Valores únicos' },
    { title: 'Numero vehículos', column: "TOTAL_VEHICULOS", fktable: "", estilo: 'Rampa' },

  ];

  const paleta_contraste = ['#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a']
  const paleta_ramp = ['#5673e0',
    '#7597f6',
    '#94b6ff',
    '#b5cdfa',
    '#d1dae9',
    '#e8d6cc',
    '#f5c1a9',
    '#f6a283',
    '#ea7b60',
    '#d44e41']

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

    if (puntosAccidentes && puntosAccidentes.features) {
      let series = [];
      let mapping_colors = {}
      let paleta = paleta_contraste;
      if(variables[index].estilo == "Rampa"){
        paleta = paleta_ramp
      }
      series = [...new Set(puntosAccidentes.features.map(obj => obj.properties[variables[index].column]))];
      for (var i = 0; i < series.length; i++) {
        if (i > paleta.length) {
          mapping_colors[series[i]] = '#' + Math.floor(Math.random() * 16777215).toString(16);
        }
        else {
          mapping_colors[series[i]] = paleta[i];
        }

      }
      setMappingColors(mapping_colors);
    }


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
import { styled, darken } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import JWTLoginTab from './tabs/JWTLoginTab';
import { Grid, Stack } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  backgroundImage: 'url(assets/images/backgrounds/A-32_Villacarrillo-VillanuevaDelArzobispo.jpeg)',
  backgroundSize: 'cover', // Ajusta el tamaño de la imagen al contenedor
  backgroundRepeat: 'no-repeat', // Evita que la imagen de fondo se repita
  

  '& .Login-leftSection': {},

  '& .Login-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Login() {
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root className="flex flex-col items-center justify-center h-screen">
      <Stack spacing={7}  
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className='shrink-0'>
        <Stack direction={'column'} maxWidth={530} className="flex items-center">
            <Typography variant="h1" fontWeight={'bold'} >
              SVIAL
            </Typography>
            <Typography variant="body1" fontWeight={400} textAlign={'center'} style={{ fontSize: '150%' }}>
              Base de datos de accidentes, tráfico y auditorías de la Red de Carreteras del Estado.
            </Typography>
            <div 
              style={{
                marginTop: '15px',
                marginBottom: '15px',
                width: '470px',
                height: '0px',
                border: '1px solid black'
            }}
            />
            <img 
                className="logo-icon"
                src="assets/images/logos/mintransport.png" 
                alt="logo ministerio de transporte de España"
                style={{maxWidth: '470px'}}
              />
        </Stack>
        <Stack>
          {selectedTab === 0 && <JWTLoginTab />}
        </Stack>
        <Stack maxWidth={200}>
          <img 
            className="logo-icon w-200" 
            src="assets/images/logos/prointec.png" 
            alt="logo ministerio de transporte de España"
            style={{padding: 10, backgroundColor: 'white', borderRadius: 10}}
          />
        </Stack>
      </Stack>
    </Root>
  );
}

export default Login;

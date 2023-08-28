import TablaLeyenda from './components/TablaLeyenda';
import { Stack } from '@mui/material';
import TablaPrincipal from './components/TablaPrincipal';
import Tabla1 from './components/Tabla1';

export default function Accidentabilidad() {
  return (
    <Stack 
      border={1} 
      marginX={3}
      padding={5}
      spacing={2}
      width={'88vw'} 
      direction={'row'} 
      className='flex flex-1' 
      alignItems={'space-around'}
      justifyContent={'space-between'} 
    >
      <Stack>
        <TablaLeyenda />
      </Stack>
      <Stack>
        <TablaPrincipal />  
      </Stack>
      <Stack>
        <Tabla1 />  
      </Stack>


    </Stack>
  );
}
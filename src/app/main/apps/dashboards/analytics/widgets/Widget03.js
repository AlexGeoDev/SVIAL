import React from 'react';
import { Stack } from '@mui/material';

const Widget03 = () => {
  return (
    <Stack
      width={800} 
      height={250}
      className='flex justify-center items-center'
      sx={{
        borderRadius: '15px',
        backgroundColor: 'white',
        border: '2px #429df0 solid', 
      }} 
    >
      <Stack>
        <img
          width={650}
          alt='tabla estadistica' 
          src='assets/images/chart.jpg'
        />
      </Stack>
    </Stack>
  )
}

export default Widget03;
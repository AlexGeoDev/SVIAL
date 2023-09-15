import PieChart from 'app/main/apps/accidentes/tabs/components/PieChart';
import React from 'react';
import Typography from '@mui/material/Typography'

const Widget02 = () => {
  return (
    <div 
      style={{
        padding: '50px 50px',
        borderRadius: '15px',
        border: '2px #429df0 solid', 
        backgroundColor: 'white',
      }} 
      className='flex flex-col justify-center items-center'
    >
      <Typography variant='h6' mb={2}>
        Víctimas mortales por tipo de accidente
      </Typography>
      <PieChart />
    </div>
  )
}

export default Widget02;
import React, { useState } from 'react';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import MapIcon from '@mui/icons-material/Map';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { dataVisibility } from 'app/main/apps/accidentalidad/store/accidentalidadDataSlice';

const DataButton = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const handleShowData = () => {
    dispatch(dataVisibility());
  }

  const buttonStyle = {
    width: '44px',
    height: '44px',
    backgroundColor: isClicked ? 'white' : 'transparent',
    borderRadius: '15%',
    padding: 0,
    minWidth: 0,
    border: isClicked ? '1px solid transparent' : '1px solid white',
  };

  const iconStyle = {
    color: isClicked ? 'black' : 'white',
  };

  return (
    <Button 
      style={buttonStyle} 
      onClick={() => {
        handleClick();
        handleShowData();
      }}
      disabled={false}
    >
      <PieChartRoundedIcon style={iconStyle} />
    </Button>
  );
};

export default DataButton;

import React, { useState } from 'react';
import MapIcon from '@mui/icons-material/Map';
import { Button } from '@mui/material';

const MapButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

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
    <Button style={buttonStyle} onClick={handleClick} disabled={true}>
      <MapIcon style={iconStyle} />
    </Button>
  );
};

export default MapButton;

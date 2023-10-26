import React, { useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { tablesVisibility } from 'app/main/apps/store/tablesSlice';


const TablesButton = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const handleShowTables = () => {
    dispatch(tablesVisibility());
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
        handleShowTables();
      }
      } 
      disabled={false}>
      <MenuRoundedIcon style={iconStyle} />
    </Button>
  );
};

export default TablesButton;

import React, { useState } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
// import { toggleTabsVisibility } from 'app/main/apps/accidentalidad/store/accidentalidadSlice';
import { toggleTabsVisibility } from 'app/main/apps/store/tabsSlice';

const SearchButton = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleShowTabs = () => {
    dispatch(toggleTabsVisibility());
  };

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
    <Button 
      style={buttonStyle} 
      onClick={() => {
        handleClick();
        handleShowTabs();
      }}
      disabled={false}>
      <SearchTwoToneIcon style={iconStyle} />
    </Button>
  );
};

export default SearchButton;

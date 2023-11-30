import React, { useState } from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { tuneVisibility } from "app/main/apps/store/tuneSlice";

const TuneButton = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const handleShowTune = () => {
    dispatch(tuneVisibility());
  };

  const buttonStyle = {
    width: "44px",
    height: "44px",
    backgroundColor: isClicked ? "white" : "transparent",
    borderRadius: "15%",
    padding: 0,
    minWidth: 0,
    border: isClicked ? "1px solid transparent" : "1px solid white",
  };

  const iconStyle = {
    color: isClicked ? "black" : "white",
  };

  return (
    <Tooltip
      title={isClicked ? "Mostrar filtros" : "Ocultar filtros"}
      placement="top"
    >
      <Button
        style={buttonStyle}
        onClick={() => {
          handleClick();
          handleShowTune();
        }}
        disabled={false}
      >
        <TuneRoundedIcon style={iconStyle} />
      </Button>
    </Tooltip>
  );
};

export default TuneButton;

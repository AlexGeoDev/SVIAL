import React, { useState } from "react";
import MapIcon from "@mui/icons-material/Map";
import { Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { mapVisibility } from "app/main/apps/store/mapsSlice";

const MapButton = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const handleShowMap = () => {
    dispatch(mapVisibility());
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
      title={isClicked ? "Mostrar mapa" : "Ocultar mapa"}
      placement="top"
    >
      <Button
        style={buttonStyle}
        onClick={() => {
          handleClick();
          handleShowMap();
        }}
        disabled={false}
      >
        <MapIcon style={iconStyle} />
      </Button>
    </Tooltip>
  );
};

export default MapButton;

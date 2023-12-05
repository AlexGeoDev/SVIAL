import React from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseFullscreenOutlinedIcon from "@mui/icons-material/CloseFullscreenOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { 
  setInputPkFin,
  setInputPkInicio,
  setPk_fin, 
  setPk_inicio, 
  setPuntosAccidentes, 
  setSelectedCarretera, 
  setSelectedEndDate, 
  setSelectedProvincia,
  setSelectedStartDate,
  setTramoGeoJson,
} from "../store/consultasSlice";

const HeaderContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "#9ecdf8",
  height: "78px",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 3),
}));

const ReportButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#c0c0c0",
  color: "black",
  maxHeight: "44px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  "& img": {
    width: 20,
    marginLeft: theme.spacing(1),
  },
}));

const AccidentesHeader = () => {
  const dispatch = useDispatch();
  
  const handleLimpiarProvincia = () => {
    dispatch(setSelectedProvincia(""));  
  }

  const handleLimpiarCarretera = () => {
    dispatch(setSelectedCarretera(""))  
  }

  const handleClearPkInicio = () => {
    dispatch(setPk_inicio(""));
    dispatch(setInputPkInicio(""))
  }
  const handleClearPkFin = () => {
    dispatch(setPk_fin(""));
    dispatch(setInputPkFin(""));
  }

  const handleClearStartDate = () => {
    dispatch(setSelectedStartDate(null))
  }
  const handleClearEndDate = () => {
    dispatch(setSelectedEndDate(null))
  }

  const handleClearMap = () => {
    dispatch(setTramoGeoJson({
      data: "",
      visible: false, // Establecer la visibilidad como false
    }));
  };  

  const handleClearGraficoyEstadisticas = () => {
    dispatch(setPuntosAccidentes(""))
  }

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:900px)"
  );

  const buttonStyle = {
    width: "44px",
    height: "44px",
    backgroundColor: "transparent",
    borderRadius: "15%",
    padding: 0,
    minWidth: 0,
    border: "1px solid white",
  };

  const button2Style = {
    width: "44px",
    height: "44px",
    backgroundColor: "white",
    borderRadius: "15%",
    padding: 0,
    minWidth: 0,
  };

  const iconStyle = {
    color: "white",
  };

  const titleVariant = isSmallScreen ? "h6" : isMediumScreen ? "h6" : "h4";
  return (
    <HeaderContainer
      height={{ sm: 100 }}
      className="flex border-1 border-black"
    >
      <Stack
        direction="row"
        width="25vw"
        className="flex justify-between items-center"
        spacing={1}
      >
        <Stack direction={"row"}>
          <Button style={button2Style} disabled={true}>
            <CloseFullscreenOutlinedIcon sx={{ color: "black" }} />
          </Button>
          <Typography
            variant={titleVariant}
            color="initial"
            style={{ marginLeft: 10, fontWeight: "bold", height: "36px" }}
          >
            Accidentes
          </Typography>
        </Stack>
        <Stack>
          <Link to="/apps/accidentalidad">
            <Tooltip title="Ir a Accidentalidad" placement="top">
              <Button style={buttonStyle} variant="outlined">
                <ReportProblemOutlinedIcon style={iconStyle} />
              </Button>
            </Tooltip>
          </Link>
        </Stack>
      </Stack>

      <Stack>
        <TextField
          id="outlined-basic"
          label="Aviso:"
          variant="filled"
          size="small"
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            width: "30vw",
          }}
        />
      </Stack>

      <Stack
        sx={{
          width: "25vw",
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="contained"
          endIcon={<BackspaceIcon />}
          sx={{
            backgroundColor: "#cfe6fa",
            maxHeight: "44px",
            borderRadius: "4px",
            minWidth: '7.5vw',
          }}
          onClick={() => {
            handleLimpiarProvincia();
            handleLimpiarCarretera();
            handleClearPkInicio();
            handleClearPkFin();
            handleClearMap();
            handleClearStartDate();
            handleClearEndDate();
            handleClearGraficoyEstadisticas();
          }}
        >
          LIMPIAR
        </Button>
        <ReportButton
          variant="contained"
          aria-label="download"
          sx={{ width: '7.5vw' }}
        >
          <DownloadIcon />
          <img src="assets/images/icons/pdfIcon.png" alt="PDF Icon" />
        </ReportButton>
        <ReportButton
          variant="contained"
          aria-label="download"
          sx={{ width: '7.5vw'  }}
        >
          <DownloadIcon />
          <img src="assets/images/icons/excelIcon.png" alt="Excel Icon" />
        </ReportButton>
      </Stack>
    </HeaderContainer>
  );
};

export default AccidentesHeader;

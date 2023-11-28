import React from "react";
import AccidentalidadHeader from "./AccidentalidadHeader";
import AccidentalidadConsultas from "./AccidentalidadConsultas";
import { Stack } from "@mui/material";

const AccidentalidadApp = () => {
  return (
    <>
      <Stack>
        <AccidentalidadHeader />
        <AccidentalidadConsultas />
      </Stack>
    </>
  );
};

export default AccidentalidadApp;

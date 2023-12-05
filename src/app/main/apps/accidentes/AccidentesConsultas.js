import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import AccidentesMap from "./AccidentesMap";
import AccidentesEstadisticas from "./AccidentesEstadisticas";
import AccidentesVariables from "./AccidentesVariables";
import { useSelector } from "react-redux";
import AccidentesGrafico from "./AccidentesGrafico";
import dataApiService from "app/services/dataApiService";
import Consultas from "../components/Consultas";

export default function AccidentesConsultas() {
  const puntosAccidentes = useSelector(
    (state) => state.consultas.puntosAccidentes
  );
  const mapVisible = useSelector((state) => state.maps.showMap);
  const dataVisible = useSelector((state) => state.data.showData);
  const tablesVisible = useSelector((state) => state.tables.showTables);
  const tuneVisible = useSelector((state) => state.tune.showTune);
  const [variableEstudio, setVariableEstudio] = useState(null);
  const default_serie = "Total";
  const default_accidentes_color_style = "#69b3a2";
  const [mappingColors, setMappingColors] = useState({
    Total: default_accidentes_color_style,
  });
  const [variables, setVariables] = useState([]);
  const [diccionariosVariables, setDiccionariosVariables] = useState([]);
  const [variableFilters, setVariableFilters] = useState([]);


  useEffect(() => {
    const get_vars = async () => {
      const vars = await dataApiService.get_variables_estudio();
      setVariables(vars);
    };
    get_vars();
  }, []);



  useEffect(() => {
    const get_diccionarios = async () => {
      const dics = await Promise.all(
        variables
          .filter((v) => {
            return v.fktable !== null;
          })
          .map(async (v) => {
            const diccionario = await dataApiService.get_diccionario(v.fktable);
            return { [v.column]: diccionario };
          })
      );
      setDiccionariosVariables(dics);
    };
    get_diccionarios();
  }, [variables]);

  return (
    <Box className="flex flex-col">
      <Stack>
        <Consultas />
      </Stack>

      {tuneVisible && (
        <Stack
          style={{
            border: "1px black solid",
            resize: "vertical",
            overflow: "auto",
            minHeight: tuneVisible ? "150px" : 0,
          }}
        >
          {variables.length > 0 && diccionariosVariables.length > 0 && (
            <AccidentesVariables
              variables={variables}
              variableFilters={variableFilters}
              setMappingColors={setMappingColors}
              setVariableEstudio={setVariableEstudio}
              setVariableFilters={setVariableFilters}
              diccionariosVariables={diccionariosVariables}
            />
          )}
        </Stack>
      )}

      <Stack
        direction={{ sm: "column", md: "row" }}
        style={{
          resizable: true,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {mapVisible && (
          <Stack
            width={{ sm: "100vw", md: "100vw" }}
            minHeight="400px"
            minWidth="25vw"
            className="border-1 border-black"
            sx={{
              overflow: "auto",
              resize: "both",
            }}
          >
            <AccidentesMap
              variables={variables}
              mappingColors={mappingColors}
              variableEstudio={variableEstudio}
              variableFilters={variableFilters}
              default_accidentes_color_style={default_accidentes_color_style}
              
            />
          </Stack>
        )}
        {dataVisible && (
          <Stack
            width={{ sm: "100vw", md: "100vw" }}
            minWidth={{ md: "30vw" }}
            minHeight="400px"
            padding={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            className="border-1 border-black"
            style={{
              resize: "both",
              overflow: "auto",
            }}
          >
            {puntosAccidentes && (
              <AccidentesGrafico
                variables={variables}
                mappingColors={mappingColors}
                default_serie={default_serie}
                variableEstudio={variableEstudio}
                variableFilters={variableFilters}
                default_accidentes_color_style={default_accidentes_color_style}
              />
            )}
          </Stack>
        )}
      </Stack>

      <Stack
        style={{
          border: tablesVisible ? "1px solid black" : 0,
          resize: tablesVisible ? "vertical" : "none",
          overflow: "auto",
          marginBottom: "1px",
          minHeight: tablesVisible ? "200px" : "0px",
        }}
      >
        {tablesVisible && (
          <Stack className="flex flex-1 py-10 items-center border-1 border-black">
            <AccidentesEstadisticas />
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import spainProvinces from "./spain-provinces.json";
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import dataApiService from "app/services/dataApiService";

const Widget04 = () => {
  const svgRef = useRef();
  // const year = 2022; // El 2023 no genera datos por el momento.

  const [year, setYear] = useState(2022);

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  const createChart = (victimasProvincias) => {
    console.log('victimasProvincias en el createChart: ', victimasProvincias);
    const width = 370;
    const height = 340;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const maxVictimas = d3.max(victimasProvincias, (d) => d.victimas_mortales);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, maxVictimas])
      .nice(1);

    const projection = d3.geoMercator()
      .fitSize([width, height], spainProvinces);

    const path = d3.geoPath().projection(projection);

    svg.selectAll("path")
      .data(spainProvinces.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("fill", (d) => {
        const id = parseInt(d.properties.cod_prov);
        const provincia = victimasProvincias.find((item) => item.id === id);
        return provincia ? colorScale(provincia.victimas_mortales) : "#ccc";
      });

    svg.selectAll("text")
      .data(spainProvinces.features)
      .enter()
      .append("text")
      .attr("x", (d) => path.centroid(d)[0])
      .attr("y", (d) => path.centroid(d)[1])
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text((d) => {
        const id = parseInt(d.properties.cod_prov);
        const provincia = victimasProvincias.find((item) => item.id === id);
        return provincia ? provincia.victimas_mortales : "";
      });
  };

  useEffect(() => {
    const fetchProvinciasData = async () => {
      console.log('year en el sueEffect: ', year); //Aunque cambia el año no se modifican los datos en victimasProvincias
      const victimasProvincias = await dataApiService.get_provincia(year);
      console.log('victimasProvincias', victimasProvincias)
      createChart(victimasProvincias);
      console.log('createChart: ', createChart);
    };

    fetchProvinciasData();
  }, [year]);

  return (
    <Grid
      sm={11}
      md={12}
      margin="10px auto"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "15px",
        backgroundColor: "white",
        border: "2px #429df0 solid",
        padding: "20px",
      }}
    >
      <Typography variant="h6" marginBottom={3}>
        Víctimas mortales por provincia
      </Typography>
      {/* <Stack sx={{minWidth: 120}}>
        <FormControl fullWidth>
          <InputLabel id="change-year">Cambiar año</InputLabel>
          <Select
            labelId="change-year"
            id="chage-year-select"
            value={year}
            label="Cambiar año"
            onChange={handleChangeYear}
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2002}>2002</MenuItem>
          </Select>
        </FormControl>
      </Stack> */}
      <svg ref={svgRef}></svg>
    </Grid>
  );
};

export default Widget04;

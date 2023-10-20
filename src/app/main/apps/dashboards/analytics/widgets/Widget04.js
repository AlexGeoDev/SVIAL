import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import spainProvinces from './spain-provinces.json'; // Debes proporcionar un archivo GeoJSON con las geometrías de las provincias
import { Grid, Typography } from '@mui/material';

const Widget04 = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 370;
    const height = 340;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const colorScale = d3.scaleSequential(d3.interpolateBlues) // Escala de colores azules
      .domain([0, spainProvinces.features.length]);

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
      // .attr("fill", "lightblue");
      .attr("fill", (d, i) => colorScale(i));

  }, []);

  return (
    <Grid 
      sm={11}
      md={12}
      margin={'10px auto'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '15px',
        backgroundColor: 'white',
        border: '2px #429df0 solid',
        padding: '20px',
      }}
    >
      <Typography variant="h6" marginBottom={3}>
        Víctimas mortales por provincia
      </Typography>
      <svg ref={svgRef}> </svg>
    </Grid>
  );
};

export default Widget04;
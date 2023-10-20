// import PieChart from 'app/main/apps/accidentes/tabs/components/PieChart';
// import React from 'react';
// import Typography from '@mui/material/Typography'
// import { Grid } from '@mui/material';

// const Widget02 = () => {
//   return (
//     <Grid container
//       sm={11}
//       md={12}
//       margin={'10px auto'}
//       style={{
//         padding: '50px 50px',
//         borderRadius: '15px',
//         border: '2px #429df0 solid', 
//         backgroundColor: 'white',
//       }} 
//       className='flex justify-center items-center'
//     >
//       <Typography variant='h6' mb={2}>
//         Víctimas mortales por tipo de accidente
//       </Typography>
//       <PieChart />
//     </Grid>
//   )
// }

// export default Widget02;





import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Grid, Stack, Typography } from '@mui/material';

const Widget02  = ({ data }) => {
  const svgRef = useRef();
  const tableRef = useRef();

  useEffect(() => {
    const width = 260;
    const height = 270;

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateRainbow(t), data.length));

    const pie = d3.pie()
      .sort(null)
      .startAngle(0)
      .endAngle(2 * Math.PI)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    // Distancia de las etiquetas al centro
    const labelRadius = arc.outerRadius()() * 0.8;

    const arcLabel = d3.arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);

    const arcs = pie(data);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 1.7, width, height/0.9])
      .attr("style", "font: 12px sans-serif;");

    svg.append("g")
      .attr("stroke", "white")
      .selectAll()
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.name}: ${(100 * d.data.value / d3.sum(data, d => d.value)).toFixed(2)}%`); // Mostrar el porcentaje

    svg.append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.1).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => `${(100 * d.data.value / d3.sum(data, d => d.value)).toFixed(2)}%`)); // Mostrar el porcentaje

         // Agregar la tabla
    const table = d3.select(tableRef.current);
    const rows = table.selectAll("tr").data(arcs).enter().append("tr");

    rows.append("td")
      .append("div")
      .style("width", "12px")
      .style("height", "12px")
      .style("background-color", d => color(d.data.name));

    rows.append("td")
      .text(d => d.data.title)
      .text(d => `${d.data.title} ${d.data.value}%`)
  }, [data]);

  return (
    <Grid 
      style={{ 
        display: "flex",
        flexDirection: "column",
        padding: '0px 10px',
        borderRadius: '15px',
        border: '2px #429df0 solid',
      }}
    >
      <Stack paddingY={2} sx={{display: 'flex', alignItems: 'center'}}>
        <Typography variant="h6">
          Víctimas mortales por tipo de accidente
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} paddingY={1}>
        <svg ref={svgRef}></svg>
        <table ref={tableRef} style={{ marginLeft: "5px" }}></table>
      </Stack>
    </Grid>
  );
};

export default Widget02;

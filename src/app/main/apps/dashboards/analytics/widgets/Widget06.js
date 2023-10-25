import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Grid } from '@mui/material';
import dataApiService from 'app/services/dataApiService';

const Widget06 = () => {
  const data = [
    { city: 'Andalucía Occidental', 'Accidentes mortales': 92, 'Víctimas mortales': 98, 'Heridos graves': 25 },
    { city: 'Andalucía Oriental', 'Accidentes mortales': 175, 'Víctimas mortales': 195, 'Heridos graves': 62 },
    { city: 'Aragon', 'Accidentes mortales': 113, 'Víctimas mortales': 128, 'Heridos graves': 28 },
    { city: 'Asturias', 'Accidentes mortales': 27, 'Víctimas mortales': 29, 'Heridos graves': 18 },
    { city: 'Cantabria', 'Accidentes mortales': 28, 'Víctimas mortales': 28, 'Heridos graves': 18 },
    { city: 'Castilla y Leon Occidental', 'Accidentes mortales': 109, 'Víctimas mortales': 125, 'Heridos graves': 41 },
    { city: 'Castilla y Leon Oriental', 'Accidentes mortales': 87, 'Víctimas mortales': 100, 'Heridos graves': 46 },
    { city: 'Castilla-La Mancha', 'Accidentes mortales': 142, 'Víctimas mortales': 155, 'Heridos graves': 70 },
    { city: 'Cataluña', 'Accidentes mortales': 188, 'Víctimas mortales': 207, 'Heridos graves': 59 },
    { city: 'Extremadura', 'Accidentes mortales': 47, 'Víctimas mortales': 50, 'Heridos graves': 20 },
    { city: 'Galicia', 'Accidentes mortales': 98, 'Víctimas mortales': 114, 'Heridos graves': 29 },
    { city: 'La Rioja', 'Accidentes mortales': 27, 'Víctimas mortales': 31, 'Heridos graves': 18 },
    { city: 'Madrid', 'Accidentes mortales': 108, 'Víctimas mortales': 122, 'Heridos graves': 27 },
    { city: 'Murcia', 'Accidentes mortales': 53, 'Víctimas mortales': 57, 'Heridos graves': 27 },
    { city: 'Valencia', 'Accidentes mortales': 173, 'Víctimas mortales': 191, 'Heridos graves': 1000 },
  ];


  useEffect(async()=>{

    const data2 = await dataApiService.get_demarcaciones();
    console.log(data2);
  })



  const chartRef = useRef();

  useEffect(() => {
    // Configuración del gráfico
    const width = 350;
    const height = 360;
    const margin = { top: 50, right: 10, bottom: 60, left: 125 };

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    // Escalas
    const xScale = d3.scaleLinear()
      .domain([0, 460])
      .nice()
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.city))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    // Colores para las categorías
    const colorScale = d3.scaleOrdinal()
      .domain(['Accidentes mortales', 'Víctimas mortales', 'Heridos graves'])
      .range(['#108cff', '#12229f', '#e76d37']);

    // Escala de apilamiento
    const stack = d3.stack()
      .keys(['Accidentes mortales', 'Víctimas mortales', 'Heridos graves'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(data);

    // Dibujar las barras apiladas
    svg.selectAll('g')
      .data(series)
      .enter().append('g')
      .attr('fill', d => colorScale(d.key))
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('y', d => yScale(d.data.city))
      .attr('x', d => xScale(d[0]))
      .attr('width', d => xScale(d[1]) - xScale(d[0]))
      .attr('height', yScale.bandwidth());

    // Agregar etiquetas de texto para los valores
    svg.selectAll('text.value')
      .data(data)
      .enter().append('text')
      .attr('class', 'value')
      .attr('x', d => xScale(d['Accidentes mortales'] / 2))
      .attr('y', d => yScale(d.city) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .style('fill', 'white')
      .style('font-size', '8px')
      .style('text-anchor', 'middle')
      .text(d => d['Accidentes mortales']);

    svg.selectAll('text.victimas-mortales')
      .data(data)
      .enter().append('text')
      .attr('class', 'victimas-mortales')
      .attr('x', d => xScale((d['Accidentes mortales']) + (d['Víctimas mortales'] / 2 )))
      .attr('y', d => yScale(d.city) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .style('fill', 'white') // Color de texto en blanco
      .style('font-size', '8px') // Tamaño de fuente más pequeño
      .style('text-anchor', 'middle')
      .text(d => d['Víctimas mortales']);

    svg.selectAll('text.heridos')
      .data(data)
      .enter().append('text')
      .attr('class', 'heridos')
      .attr('x', d => xScale((d['Accidentes mortales']) + (d['Víctimas mortales']) + (d['Heridos graves'] / 2 )))
      .attr('y', d => yScale(d.city) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .style('fill', 'white') // Color de texto en blanco
      .style('font-size', '8px') // Tamaño de fuente más pequeño
      .style('text-anchor', 'middle')
      .text(d => d['Heridos graves']);

    // Ejes
    const yAxis = d3.axisLeft(yScale)
      .tickSize(0);
    svg.append('g')
      .attr('transform', `translate(${margin.left - 5},0)`)
      .call(yAxis)
      .style('font-size', '10px')
      .call(g => g.selectAll('.domain').remove());

    const xAxis = d3.axisBottom(xScale)
      .tickSize(0)
      .tickValues([0, 200, 400]);
    
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom + 5})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove());
      
    // Agregar una leyenda horizontal
    const legendData = ['Accidentes mortales', 'Víctimas mortales', 'Heridos graves'];
    const legendX = width - 325; // Posición X inicial
    const legendY = 330; // Posición Y
    const legendCircleRadius = 5;

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${legendX},${legendY})`);

    const legendEntries = legend.selectAll('.legend-entry')
      .data(legendData)
      .enter().append('g')
      .attr('class', 'legend-entry')
      .attr('transform', (d, i) => `translate(${i * 110}, 0)`); // Espaciado horizontal

    legendEntries.append('circle')
      .attr('r', legendCircleRadius)
      .attr('fill', d => colorScale(d));

    legendEntries.append('text')
      .attr('x', 8)
      .attr('y', legendCircleRadius)
      .style('font-size', '9px')
      .style('text-anchor', 'start')
      .text(d => d);

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
      }}
    >
      <div style={{ width: '100%', border: '2px solid #429df0', borderRadius: '15px', padding: '20px', position: 'relative' }}>
    <svg
      ref={chartRef}
      style={{ width: '100%', height: 'auto' }}
      preserveAspectRatio="xMinYMin meet"
    >
      <text x="50%" y="30" textAnchor="middle" fontSize="16" fill="#333">
        Accidentalidad mortal por Demarcación
      </text>
    </svg>
  </div>
    </Grid>
  );
}

export default Widget06;
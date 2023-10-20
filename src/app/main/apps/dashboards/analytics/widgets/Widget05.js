import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Grid } from '@mui/material';

const Widget05 = () => {
  const data = [
    { city: 'Distracción', 'Accidentes mortales': 488, 'Víctimas mortales': 534, 'Heridos graves': 0 },
    { city: 'Otros', 'Accidentes mortales': 488, 'Víctimas mortales': 501, 'Heridos graves': 0 },
    { city: 'Infraccón a norma', 'Accidentes mortales': 206, 'Víctimas mortales': 228, 'Heridos graves': 81 },
    { city: 'Velocidad inadecuada', 'Accidentes mortales': 206, 'Víctimas mortales': 229, 'Heridos graves': 20 },
    { city: 'Cansancio/sueño/enfermedad', 'Accidentes mortales': 65, 'Víctimas mortales': 72, 'Heridos graves': 18 },
    { city: 'Condición de la vía', 'Accidentes mortales': 25, 'Víctimas mortales': 25, 'Heridos graves': 14 },
    { city: 'Alcohol/drogas', 'Accidentes mortales': 14, 'Víctimas mortales': 14, 'Heridos graves': 4 },
    { city: 'Metereología', 'Accidentes mortales': 5, 'Víctimas mortales': 5, 'Heridos graves': 2 },
    { city: 'Irrupción animal', 'Accidentes mortales': 5, 'Víctimas mortales': 1, 'Heridos graves': 0 },
  ];

  const chartRef = useRef();

  useEffect(() => {
    // Configuración del gráfico
    const width = 340;
    const height = 360;
    const margin = { top: 50, right: 10, bottom: 60, left: 145 };

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    // Escalas
    const xScale = d3.scaleLinear()
      .domain([0, 1050])
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
      .attr('x', d => d['Accidentes mortales'] >= 28 ? xScale(d['Accidentes mortales'] / 2) : -1000) // Coloca valores menores a 28 fuera del área visible
      .attr('y', d => yScale(d.city) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .style('fill', 'white')
      .style('font-size', '8px')
      .style('text-anchor', 'middle')
      .text(d => d['Accidentes mortales'] >= 28 ? d['Accidentes mortales'] : '');

    svg.selectAll('text.victimas-mortales')
      .data(data)
      .enter().append('text')
      .attr('class', 'victimas-mortales')
      .attr('x', d => d['Víctimas mortales'] >= 28 ? xScale((d['Accidentes mortales']) + (d['Víctimas mortales'] / 2)) : -1000)
      .attr('y', d => yScale(d.city) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .style('fill', 'white')
      .style('font-size', '8px')
      .style('text-anchor', 'middle')
      .text(d => d['Víctimas mortales'] >= 28 ? d['Víctimas mortales'] : '');

    svg.selectAll('text.heridos')
      .data(data)
      .enter().append('text')
      .attr('class', 'heridos')
      .attr('x', d => d['Heridos graves'] >= 28 ? xScale((d['Accidentes mortales']) + (d['Víctimas mortales']) + (d['Heridos graves'] / 2)) : -1000)
      .attr('y', d => yScale(d.city) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .style('fill', 'white')
      .style('font-size', '8px')
      .style('text-anchor', 'middle')
      .text(d => d['Heridos graves'] >= 28 ? d['Heridos graves'] : '');

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
      .tickValues([0, 500, 1000]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom + 5})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove());

    // leyenda horizontal
    const legendData = ['Accidentes mortales', 'Víctimas mortales', 'Heridos graves'];
    const legendX = width - 325;
    const legendY = 330;
    const legendCircleRadius = 5;

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${legendX},${legendY})`);

    const legendEntries = legend.selectAll('.legend-entry')
      .data(legendData)
      .enter().append('g')
      .attr('class', 'legend-entry')
      .attr('transform', (d, i) => `translate(${i * 110}, 0)`);

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
          <text x="50%" y="30" textAnchor="middle" fontSize="15" fill="#333">
            Accidentalidad mortal por factor concurrente
          </text>
        </svg>
      </div>
    </Grid>
  );
};

export default Widget05;

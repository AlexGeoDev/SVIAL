import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Grid } from '@mui/material';
import dataApiService from 'app/services/dataApiService';
import { DateTimePicker } from '@mui/lab';

const Widget06 = () => {
  

  const chartRef = useRef();
  useEffect(async () => {

    const date = new Date()
    const year = 2021 //date.getFullYear();


    const data = await dataApiService.get_demarcaciones(`${year}-01-01`,`${year}-12-31`);
    console.log(data);
    let data_max = 0;
    
    data.map((row) => {
      let row_sum = 0;
      Object.keys(row).map((col) => {
        row_sum += parseInt(row[col]) || 0;
      });
      if (row_sum > data_max){
        data_max = row_sum;
      }
    });
    console.log(data_max);
  
    const domain = Object.keys(data[0]).splice(1,Object.keys(data[0]).length);
    console.log(domain)

    // Configuración del gráfico
    const width = 350;
    const height = 360;
    const margin = { top: 50, right: 10, bottom: 60, left: 125 };

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    // Escalas
    const xScale = d3.scaleLinear()
      .domain([0, data_max])
      .nice()
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.demarcacion))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    // Colores para las categorías
    const colorScale = d3.scaleOrdinal()
      .domain(domain)
      .range(['#108cff', '#12229f', '#e76d37']);

    // Escala de apilamiento
    const stack = d3.stack()
      .keys(domain)
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
      .attr('y', d => yScale(d.data.demarcacion))
      .attr('x', d => xScale(d[0]))
      .attr('width', d => xScale(d[1]) - xScale(d[0]))
      .attr('height', yScale.bandwidth());


    domain.map((ele) => {
      
      svg.selectAll(`text.${ele}`)
        .data(data)
        .enter().append('text')
        .attr('class', ele)
        .attr('x', d => xScale(d[ele] / 2))
        .attr('y', d => yScale(d.demarcacion) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .style('fill', 'white')
        .style('font-size', '8px')
        .style('text-anchor', 'middle')
        .text(d => d[ele]);

    });
 
    // Ejes
    const yAxis = d3.axisLeft(yScale)
      .tickSize(0);
    svg.append('g')
      .attr('transform', `translate(${margin.left - 5},0)`)
      .call(yAxis)
      .style('font-size', '10px')
      .call(g => g.selectAll('.domain').remove());

    let ticks = [];
    for(var i = 0 ; i < Math.ceil(data_max/1000);i++ ){
      ticks.push(1000*i)
    }
    const xAxis = d3.axisBottom(xScale)
      .tickSize(0)
      .tickValues(ticks); // TODO: calcularlo de los datos
    
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom + 5})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove());
      
    // Agregar una leyenda horizontal
    const legendData = domain;
    const legendX = width - 250; // Posición X inicial
    const legendY = 350; // Posición Y
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
        Accidentalidad por Demarcación
      </text>
    </svg>
  </div>
    </Grid>
  );
}

export default Widget06;
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Data para el gráfico de barras
    const data = [10, 25, 15, 30, 20];

    // Dimensiones del gráfico
    const width = 400;
    const height = 300;

    // Crear escala x
    const xScale = d3.scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, width])
      .padding(0.1);

    // Crear escala y
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    // Crear gráfico de barras
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d))
      .attr('fill', 'steelblue');
  }, []);

  return (
    <div ref={chartRef}></div>
  );
};

export default BarChart;

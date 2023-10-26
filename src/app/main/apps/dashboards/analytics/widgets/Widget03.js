import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { year: 2019, period: 1, category1: 30, category2: 45 },
  { year: 2019, period: 2, category1: 50, category2: 25 },
  { year: 2019, period: 3, category1: 10, category2: 30 },
  { year: 2019, period: 4, category1: 40, category2: 35 },
  { year: 2020, period: 1, category1: 25, category2: 40 },
  { year: 2020, period: 2, category1: 55, category2: 20 },
  { year: 2020, period: 3, category1: 15, category2: 25 },
  { year: 2020, period: 4, category1: 50, category2: 30 },
  { year: 2021, period: 1, category1: 30, category2: 45 },
  { year: 2021, period: 2, category1: 50, category2: 25 },
  { year: 2021, period: 3, category1: 10, category2: 30 },
  { year: 2021, period: 4, category1: 40, category2: 35 },
  { year: 2022, period: 1, category1: 25, category2: 40 },
  { year: 2022, period: 2, category1: 55, category2: 20 },
  { year: 2022, period: 3, category1: 15, category2: 25 },
  { year: 2022, period: 4, category2: 50, category1: 30 },
  { year: 2023, period: 1, category1: 25, category2: 40 },
  { year: 2023, period: 2, category1: 55, category2: 20 },
  { year: 2023, period: 3, category1: 15, category2: 25 },
  { year: 2023, period: 4, category1: 50, category2: 30 }
  // Agrega más datos si es necesario
];

const width = 800;
const height = 400;

const Margin = { top: 30, right: 30, bottom: 30, left: 30 };

const Categories = ['category1', 'category2'];

const colors = ['#FF5733', '#5733FF'];

const Widget03 = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width + Margin.left + Margin.right)
      .attr('height', height + Margin.top + Margin.bottom)
      .append('g')
      .attr('transform', `translate(${Margin.left},${Margin.top})`);

    const xScale = d3.scaleBand()
      .domain(data.map(d => `${d.year}-P${d.period}`))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.category1 + d.category2)])
      .range([height, 0]);

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .selectAll('rect')
      .data(d => Categories.map(key => ({ key, value: d[key], period: d.period, year: d.year })))
      .enter()
      .append('rect')
      .attr('x', d => xScale(`${d.year}-P${d.period}`))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.value))
      .style('fill', d => colors[Categories.indexOf(d.key)]);

    // Agregar ejes
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).ticks(5));

  }, []);

  return (
    <div className="chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Widget03;

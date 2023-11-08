import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Grid } from '@mui/material';
import dataApiService from 'app/services/dataApiService';

const Widget02 = () => {
  const chartRef = useRef();
  const [actualYearData, setActualYearData] = useState(0);
  const [previousYearData, setPreviousYearData] = useState(0);

  useEffect(() => {
    const year = 2022;

    // datos reales para el año actual y el año anterior.
    dataApiService.get_victimasvs(`${year}`).then(dataVictimas => {
      setPreviousYearData(Number(dataVictimas[0].victimas_mortales));
      setActualYearData(Number(dataVictimas[1].victimas_mortales));
    });
  }, []);

  useEffect(() => {
    if (actualYearData === 0 || previousYearData === 0) {
      return; // Espera a que los datos estén disponibles.
    }

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 300 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
    const spaceBetweenTitleAndChart = 30; // Espacio entre el título y el gráfico

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', (height / 2) + margin.top + margin.bottom + spaceBetweenTitleAndChart) // Añade espacio entre título y gráfico
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left},${( height + spaceBetweenTitleAndChart) / 2 + margin.top})`); // Ajusta la transformación para centrar verticalmente

    const maxData = Math.max(actualYearData, previousYearData);
    const angleScale = d3.scaleLinear().domain([0, maxData]).range([-Math.PI / 2, Math.PI / 2]);

    const arc = d3.arc()
      .innerRadius(50)
      .outerRadius(80)
      .startAngle(angleScale(0))
      .endAngle(angleScale(actualYearData));

    const referenceArc = d3.arc()
      .innerRadius(50)
      .outerRadius(80)
      .startAngle(angleScale(0))
      .endAngle(angleScale(previousYearData));

    svg.append('path')
      .attr('d', arc)
      .style('fill', 'green');

    svg.append('path')
      .attr('d', referenceArc)
      .style('fill', 'gray');

    svg.append('text')
      .text(`Víctimas mortales vs año anterior (2022)`)
      .attr('text-anchor', 'middle')
      .attr('dy', -height / 2 - spaceBetweenTitleAndChart / 2); // Ajusta la posición del título
  }, [actualYearData, previousYearData]);

  return (
    <Grid 
      ref={chartRef}
      style={{ 
        display: "flex",
        flexDirection: "column",
        padding: '0px 10px',
        borderRadius: '15px',
        border: '2px #429df0 solid',
      }}
    />
  );
};

export default Widget02;

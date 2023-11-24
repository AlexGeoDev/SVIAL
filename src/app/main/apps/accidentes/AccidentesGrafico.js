import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as c3 from 'c3';
import { 
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import { ObjectSchema } from 'yup';
import { CardTravelSharp } from '@mui/icons-material';

function AccidentesGrafico({ puntosAccidentes, variableEstudio, default_serie, mappingColors, default_accidentes_color_style }) {

  const ref = useRef();
  const chartConfig = useRef();

  const [loading, setLoading] = useState(true);
  const [selectedTipoGrafico, setSelectedTipoGrafico] = useState('bar');


  const margin = { top: 30, right: 30, bottom: 120, left: 60 }
  const width = 460 - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom;



  // -----------------------------------------------codigo para d3js----------------------------------------------------
  // useEffect(() => {
  //   const svg = d3
  //     .select(ref.current)
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", `translate(${margin.left},${margin.top})`);

  //   // Initialize the X axis
  //   const x = d3.scaleBand().range([0, width]).domain([default_serie]).padding(0.2);
  //   const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);

  //   // Initialize the Y axis
  //   const y = d3.scaleLinear().range([height, 0]);
  //   const yAxis = svg.append("g").attr("class", "myYaxis");

  //   chartConfig.current = { svg, x, xAxis, y, yAxis };
  //   setLoading(false);
  //   setFirstRun(true)
  // }, []);

  // useEffect(() => {
  //   if (loading || !chartConfig.current) return;
  //   const { svg, x, xAxis, y, yAxis } = chartConfig.current;

  //   // Update the X axis
  //   const geojson_data = puntosAccidentes.features || [];
  //   let data = []
  //   let series = [default_serie]

  //   let data_domain = [0, 0]
  //   if (variableEstudio && variableEstudio !== "") {

  //     series = [...new Set(geojson_data.map(obj => obj.properties[variableEstudio.column]))];
  //     let max_data = 0;
  //     data = series.map((serie) => {
  //       let serie_value = geojson_data.filter((feature) => { return feature.properties[variableEstudio.column] == serie }).length;
  //       if (serie_value >= max_data) {
  //         max_data = serie_value;
  //       }
  //       return { "Serie": serie, "Value": serie_value }
  //     });
  //     data_domain = [0, max_data];
  //   }
  //   else {

  //     console.log("No hay variable seleccionada");
  //     let data_len = geojson_data.length || 0
  //     data = [{ "Serie": default_serie, "Value": data_len }];
  //     data_domain = [0, data_len]
  //   }


  //   x.domain(series);
  //   xAxis.call(d3.axisBottom(x)).selectAll("text")
  //   .attr("transform", "translate(-10,0)rotate(-45)")
  //   .style("text-anchor", "end");;

  //   // Update the Y axis
  //   y.domain(data_domain);
  //   yAxis.transition().duration(1000).call(d3.axisLeft(y));

  //   // Create the u variable
  //   var u = svg.selectAll("rect").data(data);
  //   u.exit().remove();

  //   if(mappingColors && Object.keys(mappingColors).length > 1){
  //     u.join("rect") // Add a new rect for each new elements
  //     .transition()
  //     .duration(1000)
  //     .attr("x", (d) => x(d.Serie))
  //     .attr("y", (d) => y(d.Value))
  //     .attr("width", x.bandwidth())
  //     .attr("height", (d) => height - y(d.Value))
  //     .attr("fill", (d) => mappingColors[d.Serie]);
  //   }
  //   else{
  //     u.join("rect") // Add a new rect for each new elements
  //     .transition()
  //     .duration(1000)
  //     .attr("x", (d) => x(d.Serie))
  //     .attr("y", (d) => y(d.Value))
  //     .attr("width", x.bandwidth())
  //     .attr("height", (d) => height - y(d.Value))
  //     .attr("fill", default_accidentes_color_style);
  //   }

  // }, [puntosAccidentes, variableEstudio, firstRun, mappingColors]);

  // ---------------------------------------------------------------------------------------------------


  // -----------------------------------------------codigo para c3js----------------------------------------------------



  const handleTipoGrafico = (e) => {
 
    setSelectedTipoGrafico( e.target.value);
    const selectedValue = e.target.value;
    const { chart } = chartConfig.current;
    const geojson_data = puntosAccidentes.features || [];
    let columns = [[default_serie, puntosAccidentes.features.length]]
    if (variableEstudio && variableEstudio !== "") {
      let series = [];
      series = [...new Set(geojson_data.map(obj => obj.properties[variableEstudio.column]))];
      columns = []
      series.map((s) => {
        let serie_count = geojson_data.filter((f) => { return f.properties[variableEstudio.column] == s; }).length;
        if (s!==null){
          columns.push([s, serie_count]);
        }
        else{
          columns.push(['Sin datos', serie_count]);
        }
      });
    }

    chart.load({
      unload: true,
      type:e.target.value,
      columns: columns
    });
    chart.data.colors(mappingColors);
  }

  useEffect(() => {

    const geojson_data = puntosAccidentes.features || [];
    let columns = [[default_serie, puntosAccidentes.features.length]]
    if (variableEstudio && variableEstudio !== "") {
      console.log(variableEstudio);
      let series = [];
      series = [...new Set(geojson_data.map(obj => obj.properties[variableEstudio.column]))];
      columns = []
      series.map((s) => {
        let serie_count = geojson_data.filter((f) => { return f.properties[variableEstudio.column] == s; }).length;
        if (s!==null){
          columns.push([s, serie_count]);
        }
        else{
          columns.push(['Sin datos', serie_count]);
        }
      });

    }

    const chart = c3.generate({
      data: {
        columns: columns,
        type: selectedTipoGrafico,
        colors: mappingColors
      },
      bar: {
        width: {
          ratio: 0.5
        }
      }
    });

    chartConfig.current = { chart };
    setLoading(false);
  }, []);



  useEffect(() => {
    if (loading || !chartConfig.current) return;
    const { chart } = chartConfig.current;

    const geojson_data = puntosAccidentes.features || [];
    let columns = [[default_serie, puntosAccidentes.features.length]]
    if (variableEstudio && variableEstudio !== "") {
      let series = [];
      series = [...new Set(geojson_data.map(obj => obj.properties[variableEstudio.column]))];
      columns = []
      series.map((s) => {
        let serie_count = geojson_data.filter((f) => { return f.properties[variableEstudio.column] == s; }).length;
 
        if (s!==null){
          columns.push([s, serie_count]);
        }
        else{
          columns.push(['Sin datos', serie_count]);
        }
        
      });

    }

    chart.load({
      unload: true,
      columns: columns,
      type: selectedTipoGrafico
    });
    chart.data.colors(mappingColors);

  }, [puntosAccidentes, variableEstudio, mappingColors])

  return (
    <Stack
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
  spacing={0}
  width={{ sm: '100vw', md: '100vw' }}
  useFlexGap flexWrap="wrap"
>
        <div id="chart" />
       <Select
                size="small"
                labelId="Elegir provincia"
                id="elegir-provincia"
                value={selectedTipoGrafico}
                label="Tipo de gráfico"
                onChange={handleTipoGrafico}
              >
                  <MenuItem value={'bar'}>
                    Columnas
                  </MenuItem>
                  <MenuItem value={'pie'}>
                    Tarta
                  </MenuItem>
              </Select>
    </Stack>
  );
}

export default AccidentesGrafico;
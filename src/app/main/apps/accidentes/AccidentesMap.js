// import React, { useState, useEffect } from 'react';
// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import WMTS from "ol/source/WMTS";
// import WMTSTileGrid  from "ol/tilegrid/WMTS";
// import Vector from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
// import { Vector as VectorLayer } from 'ol/layer';
// import { Style, Stroke, Circle, Fill } from 'ol/style';

// function AccidentesMap({ tramoGeoJson, puntosAccidentes }) {
//   const [map, setMap] = useState(null);
  
//   useEffect(() => {
//     // console.log('tramoGeoJson.Features desde el mapa: ', tramoGeoJson ? tramoGeoJson[0].geojson.features : 'tramoGeoJson sin data')
//     console.log('puntosAccidentes desde el mapa: ', puntosAccidentes ? 'prueba ok' : 'puntosAccidentes sin data')
//     const españa = [-400000, 4870000];

//     try {
//       // Filtra las características sin geometría definida
//       const featuresWithGeometry = tramoGeoJson && tramoGeoJson[0].geojson.features
//         ? tramoGeoJson[0].geojson.features.filter(
//             (feature) => feature.geometry && feature.geometry.coordinates
//           )
//         : [];

//       // Crea una capa vectorial con los datos filtrados
//       const vectorLayer = new VectorLayer({
//         source: new Vector({
//           features: new GeoJSON().readFeatures(
//             { type: 'FeatureCollection', features: featuresWithGeometry },
//             {
//               dataProjection: 'EPSG:25830',
//               featureProjection: 'EPSG:3857', // wgs84 -- 4326
//             }
//           ),
//         }),
//         // Ahora vamos a transformar las coordenadas de la capa vectorial
//         // geometryFunction: function (geometry) {
//         //   if (geometry) {
//         //     geometry.transform('EPSG:25830', 'EPSG:3857'); // wgs84 -- 4326
//         //     console.log('Geometry transformada:', geometry);
//         //   } else {
//         //     console.log('Geometry nula o indefinida');
//         //   }
//         //   return geometry;
//         // },
        
//         // Actualiza la parte de estilo
//         style: new Style({
//           stroke: new Stroke({ 
//             color: 'red',
//             width: 2
//           }),
//         }),
//       });

//       const puntosAccidentesCoordinates = puntosAccidentes && puntosAccidentes[0]?.geojson.features
//         ? puntosAccidentes[0].geojson.features.filter(
//           (feature) => feature.geometry && feature.geometry.coordinates
//           )
//         : [];
//       {puntosAccidentesCoordinates ? console.log('PAF: ', puntosAccidentesCoordinates) : 'error garrafal'}

//       const vectorLayerAccidentes = new VectorLayer({
//         source: new Vector({
//           features: new GeoJSON().readFeatures(
//             { type: 'FeatureCollection', features: puntosAccidentesCoordinates },
//             {
//               dataProjection: 'EPSG:25830',
//               featureProjection: 'EPSG:3857',
//             }
//           ),
//         }),
//         style: new Style({
//           image: new Circle({
//             radius: 6,
//             fill: new Fill({ color: 'cyan' }),
//             stroke: new Stroke({ color: 'blue', width: 2 }),
//           }),
//         }),
//       });

//       const map = new Map({
//         target: 'map-container',
//         layers: [
//           new TileLayer({
//             source: new WMTS({
//               url: 'https://www.ign.es/wmts/pnoa-ma',
//               layer: 'OI.OrthoimageCoverage',
//               style: 'default',
//               format: 'image/png',
//               tileSize: 256,
//               projection: 'EPSG:3857',
//               matrixSet: 'EPSG:3857', // Asegúrate de incluir esta línea
//               tileGrid: new WMTSTileGrid({
//                 origin: [-400000, 4870000],
//                 resolutions: [
//                   156543.033928041,
//                   78271.5169640205,
//                   39135.7584820102,
//                   19567.8792410051,
//                   9783.9396205025,
//                   4891.9698102512,
//                   2445.9849051256,
//                   1222.9924525628,
//                   611.4962262814,
//                   305.7481131407,
//                   152.8740565703,
//                   76.4370282851,
//                   38.2185141426,
//                   19.1092570713,
//                   9.5546285356,
//                   4.7773142678,
//                   2.3886571339,
//                   1.1943285669,
//                   0.5971642835,
//                 ],
//                 matrixIds: Array.from({ length: 20 }, (_, i) => i.toString()),
//               }),
//             }),
//           }),
//             vectorLayer,
//             vectorLayerAccidentes,
//         ],
//         view: new View({
//           center: españa,
//           zoom: 5.5,
//         }),
//       });

//       setMap(map);

//       return () => {
//         map.setTarget(null);
//       };
//     } catch (error) {
//       console.error('Error al crear la capa vectorial:', error);
//     }
//   }, [tramoGeoJson, puntosAccidentes]);

//   return <div id="map-container" style={{ width: '100%', height: '100%' }} />;
// }

// export default AccidentesMap;


import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';

function AccidentesMap({ tramoGeoJson, puntosAccidentes }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log('puntosAccidentes desde el mapa: ', puntosAccidentes ? 'prueba ok' : 'puntosAccidentes sin data');
    const españa = [-400000, 4870000];

    try {
      const featuresWithGeometry = tramoGeoJson && tramoGeoJson[0]?.geojson.features
        ? tramoGeoJson[0].geojson.features.filter(
            (feature) => feature.geometry && feature.geometry.coordinates
          )
        : [];

      const vectorLayer = new VectorLayer({
        source: new Vector({
          features: new GeoJSON().readFeatures(
            { type: 'FeatureCollection', features: featuresWithGeometry },
            {
              dataProjection: 'EPSG:25830',
              // featureProjection: 'EPSG:3857',
            }
          ),
        }),
        style: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2,
          }),
        }),
      });

      const puntosAccidentesCoordinates = puntosAccidentes && puntosAccidentes[0]?.geojson.features
        ? puntosAccidentes[0].geojson.features.filter(
          (feature) => feature.geometry && feature.geometry.coordinates
          )
        : [];
      {puntosAccidentesCoordinates ? console.log('PAF: ', puntosAccidentesCoordinates) : 'error garrafal'}
      console.log('PAF: ', puntosAccidentesCoordinates);

      const vectorLayerAccidentes = new VectorLayer({
        source: new Vector({
          features: new GeoJSON().readFeatures(
            { type: 'FeatureCollection', features: puntosAccidentesCoordinates },
            {
              dataProjection: 'EPSG:25830',
              // featureProjection: 'EPSG:3857',
            }
          ),
        }),
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: 'cyan' }),
            stroke: new Stroke({ color: 'blue', width: 2 }),
          }),
        }),
      });



      const map = new Map({
        target: 'map-container',
        layers: [
          new TileLayer({
            source: new TileWMS({
              url: 'https://www.ign.es/wms-inspire/mapa-raster',
              params: {'LAYERS': 'mtn_rasterizado', 'TILED': true, 'SRS':'EPSG:25830', 'VERSION':'1.3.0', 'CRS':'EPSG:25830'},
              projection: 'EPSG:25830',
              transition: 0,
            }),
          }),
          vectorLayer,
          vectorLayerAccidentes,
        ],
        view: new View({
          center: españa,
          zoom: 5.5,
        }),
      });

      setMap(map);

      return () => {
        map.setTarget(null);
      };
    } catch (error) {
      console.error('Error al crear la capa vectorial:', error);
    }
  }, [tramoGeoJson, puntosAccidentes]);

  return <div id="map-container" style={{ width: '100%', height: '100%' }} />;
}

export default AccidentesMap;

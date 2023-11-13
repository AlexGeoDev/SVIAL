import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Stroke, Circle, Fill } from 'ol/style';

function AccidentesMap({ tramoGeoJson, puntosAccidentes }) {
  const [map, setMap] = useState(null);
  
  useEffect(() => {
    // console.log('tramoGeoJson.Features desde el mapa: ', tramoGeoJson ? tramoGeoJson[0].geojson.features : 'tramoGeoJson sin data')
    console.log('puntosAccidentes desde el mapa: ', puntosAccidentes ? 'prueba ok' : 'puntosAccidentes sin data')
    const españa = [-400000, 4870000];

    try {
      // Filtra las características sin geometría definida
      const featuresWithGeometry = tramoGeoJson && tramoGeoJson[0].geojson.features
        ? tramoGeoJson[0].geojson.features.filter(
            (feature) => feature.geometry && feature.geometry.coordinates
          )
        : [];

      // Crea una capa vectorial con los datos filtrados
      const vectorLayer = new VectorLayer({
        source: new Vector({
          features: new GeoJSON().readFeatures(
            { type: 'FeatureCollection', features: featuresWithGeometry },
            {
              dataProjection: 'EPSG:25830',
              featureProjection: 'EPSG:3857', // wgs84 -- 4326
            }
          ),
        }),
        // Ahora vamos a transformar las coordenadas de la capa vectorial
        // geometryFunction: function (geometry) {
        //   if (geometry) {
        //     geometry.transform('EPSG:25830', 'EPSG:3857'); // wgs84 -- 4326
        //     console.log('Geometry transformada:', geometry);
        //   } else {
        //     console.log('Geometry nula o indefinida');
        //   }
        //   return geometry;
        // },
        
        // Actualiza la parte de estilo
        style: new Style({
          stroke: new Stroke({ 
            color: 'red',
            width: 2
          }),
        }),
      });

      const puntosAccidentesFeatures = puntosAccidentes && puntosAccidentes[0]?.geojson.features
        ? puntosAccidentes[0].geojson.features
          .filter((feature) => feature.geometry && feature.geometry.coordinates)
        : [];

        const vectorLayerAccidentes = new VectorLayer({
          source: new Vector({
            features: new GeoJSON().readFeatures(
              { type: 'FeatureCollection', features: puntosAccidentesFeatures },
              {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
              }
            ),
          }),
          style: new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({ color: 'cyan' }),
              stroke: new Stroke({ color: 'blue', width: 5 }),
            }),
          }),
        });

      const map = new Map({
        target: 'map-container',
        layers: [
          new TileLayer({
            source: new OSM({
              projection: 'EPSG: 4326',
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
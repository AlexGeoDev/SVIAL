import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import TileWMS from 'ol/source/TileWMS';
import {get as getProjection} from 'ol/proj.js';
import {register} from 'ol/proj/proj4.js';
import proj4 from 'proj4';


function AccidentesMap({ tramoGeoJson, puntosAccidentes }) {
  const [map, setMap] = useState(null);
  proj4.defs("EPSG:25830","+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
  register(proj4);
  const epsg25830Projection = getProjection('EPSG:25830');
  

  useEffect(() => {
    console.log('puntosAccidentes desde el mapa: ', puntosAccidentes ? 'prueba ok' : 'puntosAccidentes sin data');
    const españa = [442484.6387,4471319.5361];

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
            { type: 'FeatureCollection', features: puntosAccidentesCoordinates }
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


      console.log(epsg25830Projection)
      const map = new Map({
        target: 'map-container',
        layers: [
          new TileLayer({
            
            source: new TileWMS({
              url: 'https://www.ign.es/wms-inspire/mapa-raster',
              params: {'LAYERS': 'mtn_rasterizado', 'TILED': true, 'SRS':'EPSG:25830', 'VERSION':'1.3.0', 'CRS':'EPSG:25830'},
              
              transition: 0,
            }),
          }),
          vectorLayer,
          vectorLayerAccidentes,
        ],
        view: new View({
          projection: epsg25830Projection,
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

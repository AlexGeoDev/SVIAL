import React, { useRef, useState, useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Vector from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import { Style, Stroke, Circle, Fill } from "ol/style";
import TileWMS from "ol/source/TileWMS";
import { get as getProjection } from "ol/proj.js";
import { register } from "ol/proj/proj4.js";
import proj4 from "proj4";
import mapService from "app/services/map/mapService";
import { useSelector } from "react-redux";

function AccidentesMap({
  variableEstudio,
  mappingColors,
  default_accidentes_color_style,
  variableFilters,
  variables
}) {
  const mapTargetElement = useRef();
  const [map, setMap] = useState(null);
  
  const tramoGeoJson = useSelector((state) => state.consultas.tramoGeoJson);
  const puntosAccidentes = useSelector(
    (state) => state.consultas.puntosAccidentes
  );
  const [accidentesMapService, setAccidentesMapService] = useState(null);



  proj4.defs(
    "EPSG:25830",
    "+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
  );
  register(proj4);
  const epsg25830Projection = getProjection("EPSG:25830");
  const peninsula_bbox = [442484.6387, 4471319.5361];

  const [capaTramo, setCapaTramo] = useState(null);
  const [capaAccidentes, setCapaAccidentes] = useState(null);

  useEffect(() => {
    const map = new Map({
      target: "map-container",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "https://www.ign.es/wms-inspire/mapa-raster",
            params: {
              LAYERS: "mtn_rasterizado",
              TILED: true,
              SRS: "EPSG:25830",
              VERSION: "1.3.0",
              CRS: "EPSG:25830",
            },
            transition: 0,
          }),
        }),
      ],
      view: new View({
        projection: epsg25830Projection,
        center: peninsula_bbox,
        zoom: 5.5,
      }),
    });

    setCapaTramo(
      new VectorLayer({
        source: new Vector(),
        map: map,
        style: {
          "stroke-color": "rgba(255, 0, 0, 1)",
          "stroke-width": 3,
        },
      })
    );

    const accidentesStyleFunction = function (feature, resolution) {
      let class_color = default_accidentes_color_style;
      if (Object.keys(mappingColors).length > 1 && variableEstudio) {
        class_color = mappingColors[feature.get(variableEstudio.column)];
      }
      if (feature.get("visible") == false) {
        class_color += "00";
      }

      return [
        new Style({
          image: new Circle({
            fill: new Fill({
              color: class_color,
            }),
            stroke: new Stroke({
              color: class_color,
              width: 1,
            }),
            radius: 8,
          }),
        }),
      ];
    };

    setCapaAccidentes(
      new VectorLayer({
        source: new Vector(),
        map: map,
        style: accidentesStyleFunction,
      })
    );

    map.setTarget(mapTargetElement.current || "");
    setMap(map);
    setAccidentesMapService(new mapService(map));

    return () => map.setTarget("");
  }, []);

  useEffect(() => {
    if (tramoGeoJson && capaTramo && capaTramo.getSource()) {
      capaTramo.getSource().clear();
      const features = new GeoJSON().readFeatures(tramoGeoJson);
      capaTramo
        .getSource()
        .addFeatures(features);

        accidentesMapService.zoomTo(features);
    }

    if (
      puntosAccidentes &&
      puntosAccidentes.features &&
      capaAccidentes &&
      capaAccidentes.getSource()
    ) {
      capaAccidentes.getSource().clear();
      capaAccidentes
        .getSource()
        .addFeatures(new GeoJSON().readFeatures(puntosAccidentes));
    }

    if (
      variableEstudio &&
      puntosAccidentes &&
      puntosAccidentes.features &&
      capaAccidentes
    ) {
      const accidentesStyleFunction = function (feature, resolution) {
        let class_color = default_accidentes_color_style;
        if (Object.keys(mappingColors).length > 1) {
          class_color = mappingColors[feature.get(variableEstudio.column)];
        }

        return [
          new Style({
            image: new Circle({
              fill: new Fill({
                color: class_color,
              }),
              stroke: new Stroke({
                color: class_color,
                width: 1,
              }),
              radius: 8,
            }),
          }),
        ];
      };
      capaAccidentes.setStyle(accidentesStyleFunction);
    }
  }, [
    tramoGeoJson,
    puntosAccidentes,
    variableEstudio,
    capaTramo,
    capaAccidentes,
  ]);

  return (
    <div
      ref={mapTargetElement}
      className="map"
      id="map-container"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default AccidentesMap;

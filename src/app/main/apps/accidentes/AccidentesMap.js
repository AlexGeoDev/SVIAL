import React, { useRef, useState, useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Vector from "ol/source/Vector";
import Group from "ol/layer/Group"
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import { Style, Stroke, Circle, Fill } from "ol/style";
import TileWMS from "ol/source/TileWMS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import WMTS from "ol/source/WMTS";
import { getTopLeft, getWidth, applyTransform} from "ol/extent";
import { get as getProjection, getTransform  } from "ol/proj.js";
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


  //const extent = [-1968157.09 , 3638026.2 ,4677582.63, 12837333]

  // const top_left_tile_cero = [-1968157.095 , 2.2856087*10000000];
  // const sclale_denominator = 2.795411320714286 * 100000000 ;
  // const pixel_size = 0.00028 * sclale_denominator;
  // const n_tiles = 1;
  
  // console.log(sclale_denominator);
  // const tile_size = 256;
  // const proj25830extent = [top_left_tile_cero[0], 
  //                       top_left_tile_cero[1] - (pixel_size*tile_size*n_tiles), 
  //                       top_left_tile_cero[0] + (pixel_size*tile_size*n_tiles), 
  //                       top_left_tile_cero[1]]
  
  // console.log(proj25830extent)
  // epsg25830Projection.setExtent(proj25830extent);

  
  const [capaTramo, setCapaTramo] = useState(null);
  const [capaAccidentes, setCapaAccidentes] = useState(null);

  useEffect(() => {

    // var resolutions = new Array(19);
    // var matrixIds = new Array(19);
    // var size = getWidth(epsg25830Projection.getExtent()) / 256 ;
		// for (var z = 0; z < 20; ++z) {
		//   // generate resolutions and matrixIds arrays for this WMTS
		//   resolutions[z] = size / Math.pow(2, z);
    //   matrixIds[z] = z;
		// }
    // const origin = getTopLeft(epsg25830Projection.getExtent());



        let layers = [
        new TileLayer({
          title: "IGN Raster",
          baseLayer: true,
          visible:false,
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
        new TileLayer({
          title: "PNOA",
          openInLayerSwitcher:true,
          baseLayer: true,
          visible:false,
          source: new TileWMS({
            url: "https://www.ign.es/wms-inspire/pnoa-ma",
            params: {
              LAYERS: "OI.OrthoimageCoverage",
              TILED: true,
              SRS: "EPSG:25830",
              VERSION: "1.3.0",
              CRS: "EPSG:25830",
            },
            transition: 0,
          }),
        }),
        new TileLayer({
          title: "Mapa base IGN",
          baseLayer: true,
          visible:true,
          source: new TileWMS({
            url: "https://www.ign.es/wms-inspire/ign-base",
            params: {
              LAYERS: "IGNBaseTodo",
              TILED: true,
              SRS: "EPSG:25830",
              VERSION: "1.3.0",
              CRS: "EPSG:25830",
            },
            transition: 0,
          }),
        })
      ]
      
      

      const _capaTramo = new VectorLayer({
        openInLayerSwitcher: true,
        source: new Vector(),
        name: "Tramo",
        style: {
          "stroke-color": "rgba(255, 0, 0, 1)",
          "stroke-width": 3,
        },
      });

      setCapaTramo(
        _capaTramo
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

    const _capaAccidentes = new VectorLayer({
      name:"Accidentes",
      openInLayerSwitcher: true,
      source: new Vector(),
      style: accidentesStyleFunction,
    }) 

    setCapaAccidentes(_capaAccidentes);

    layers.push(_capaTramo);
    layers.push(_capaAccidentes);

    const map = new Map({
      target: "map-container",
      layers: layers,
      view: new View({
        projection: epsg25830Projection,
        center: peninsula_bbox,
        zoom: 5.5,
      }),
    });

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
        console.log(accidentesMapService.layerSwitcher.displayInLayerSwitcher(capaTramo));
        accidentesMapService.layerSwitcher.setMap(map);
        console.log(accidentesMapService.layerSwitcher)

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

      accidentesMapService.filterLayerFeatures(capaAccidentes, variableFilters, variables) 
      accidentesMapService.layerSwitcher.displayInLayerSwitcher(capaAccidentes);
      console.log(accidentesMapService.layerSwitcher)
    }

    if (
      variableEstudio &&
      puntosAccidentes &&
      puntosAccidentes.features &&
      capaAccidentes
    ) {
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
      capaAccidentes.setStyle(accidentesStyleFunction);
    }
  }, [
    tramoGeoJson,
    puntosAccidentes,
    variableEstudio,
    capaTramo,
    capaAccidentes,
    variableFilters,
    variables
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

import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

function AccidentalidadMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const nyc = [-8249387.5, 4968481.5];

    const map = new Map({
      target: 'map-container',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: nyc,
        zoom: 12,
      }),
    });

    setMap(map);

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '400px' }} />;
}

export default AccidentalidadMap;
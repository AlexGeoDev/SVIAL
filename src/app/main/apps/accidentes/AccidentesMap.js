// import React, { useState, useEffect } from 'react';
// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import Overlay from 'ol/Overlay';
// import { fromLonLat } from 'ol/proj';
// // import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// function AccidentesMap() {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     const nyc = fromLonLat([-73.935242, 40.730610]);

//     const map = new Map({
//       target: 'map-container',
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//       ],
//       view: new View({
//         center: nyc,
//         zoom: 12,
//       }),
//     });

//     const legendContainer = document.createElement('div');
//     legendContainer.className = 'legend-container';

//     const legend = new Overlay({
//       element: legendContainer,
//       positioning: 'bottom-right',
//     });

//     map.addOverlay(legend);

//     setMap(map);

//     return () => {
//       map.setTarget(null);
//     };
//   }, []);

//   return (
//     <div>
//       <div id="map-container" style={{ width: '100%', height: '400px' }} />
      
//     </div>
//   );
// }

// export default AccidentesMap;




{/* <div className="legend-container border-1 border-red flex justify-end">
        <div 
          className="legend border-1 border-blue" 
        >
          <h3>LEYENDA</h3>
          <p>Lesividad</p>
          <div className="legend-item" 
            style={{
              display: 'flex', 
              flexDirection: 'row',
            }}
          >
            <div className="legend-icon">
              <AccountBalanceIcon />
            </div>
            <div className="legend-label">Nombre/Variable 1</div>
          </div>
          <div className="legend-item"
            style={{
              display: 'flex', 
              flexDirection: 'row',
            }}
          >
            <div className="legend-icon">
              <AccountBalanceIcon />
            </div>
            <div className="legend-label">Nombre/Variable 2</div>
          </div>
          {/* Puedes agregar más elementos de leyenda aquí 
        </div>
      </div> */}











      import React, { useState, useEffect } from 'react';
      import 'ol/ol.css';
      import Map from 'ol/Map';
      import View from 'ol/View';
      import TileLayer from 'ol/layer/Tile';
      import OSM from 'ol/source/OSM';
      import Overlay from 'ol/Overlay';
      import { fromLonLat } from 'ol/proj';
      import ol from 'ol-ext/control/Legend'
      // import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
      
      function AccidentesMap() {
        const [map, setMap] = useState(null);
      
        useEffect(() => {
          const nyc = fromLonLat([-73.935242, 40.730610]);
      
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
      
          const legendContainer = document.createElement('div');
          legendContainer.className = 'legend-container';
      
          // const legend = new ol.control.Legend({
          //   target: legendContainer,
          //   layers: map.getLayers(),
          //   position: 'bottom-right',
          //   offset: [0, -20]
          // });
      
          // map.addControl(legend);
      
          setMap(map);
      
          return () => {
            map.setTarget(null);
          };
        }, []);
      
        return (
          <div>
            <div id="map-container" style={{ width: '100%', height: '400px' }} />
            
          </div>
        );
      }
      
      export default AccidentesMap;

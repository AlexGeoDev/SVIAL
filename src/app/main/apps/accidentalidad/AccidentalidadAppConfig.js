import { Navigate } from 'react-router-dom';
import AccidentalidadApp from './AccidentalidadApp';

const AccidentalidadAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/accidentalidad',
      element: <AccidentalidadApp />,
    },
    {
      path: 'apps/accidentalidad',
      element: <Navigate to="/apps/accidentalidad" />,
    },
  ],
};

export default AccidentalidadAppConfig;
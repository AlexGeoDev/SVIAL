import { lazy } from 'react';

const AccidentesApp = lazy(() => import('./AccidentesApp'));

const AccidentesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/accidentes',
      element: <AccidentesApp />,
    },
  ],
};

export default AccidentesAppConfig;

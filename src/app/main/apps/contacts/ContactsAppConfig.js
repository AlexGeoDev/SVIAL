import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ContactsApp = lazy(() => import('./ContactsApp'));

const ContactsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/contacts/:filter',
      element: <ContactsApp />,
    },
    {
      path: 'apps/contacts/all',
      element: <ContactsApp />,
    },
    {
      path: 'apps/contacts/status/:state',
      element: <ContactsApp />,
    },
    {
      path: 'apps/contacts/profiles/:profile',
      element: <ContactsApp />,
    },
    {
      path: 'apps/contacts',
      element: <Navigate to="/apps/contacts/all" />,
    },
  ],
};

export default ContactsAppConfig;

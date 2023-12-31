import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'general',
    title: 'general',
    translate: 'GENERAL',
    type: 'item',
    icon: 'home',
    url: 'apps/dashboards/analytics',
  },
  {
    id: 'modulos',
    title: 'modulos',
    translate: 'MENÚ\tPRINCIPAL',
    type: 'group',
    icon: 'M',
    children: [
      {
        id: 'Accidentalidad',
        title: 'Accidentalidad',
        translate: 'Accidentalidad',
        type: 'item',
        icon: 'report_problem',
        url: 'apps/accidentalidad',
      },
      {
        id: 'accidentes',
        title: 'accidentes',
        translate: 'Accidentes',
        type: 'item',
        icon: 'close_fullscreen',
        url: 'apps/accidentes',
      },
      {
        id: 'tca',
        title: 'tca',
        translate: 'TCA',
        type: 'item',
        icon: 'signal_cellular_connected_no_internet_4_bar',
        url: 'apps/tca',
      },
      {
        id: 'tapm',
        title: 'tapm',
        translate: 'TAPM',
        type: 'item',
        icon: 'edit_road',
        url: 'apps/tapm',
      },
    ]
  },
  {
    id: 'auditorias',
    title: 'auditorias',
    translate: 'AUDITORÍAS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'auditorias',
        title: 'auditorias',
        translate: 'Auditorías',
        type: 'item',
        icon: 'plagiarism',
        url: 'apps/auditorias',
      },
    ],
  },
  {
    id: 'repositorio',
    title: 'repositorio',
    translate: 'REPOSITORIO',
    type: 'item',
    icon: 'device_hub',
    url: 'apps/repositorio',
  },
  {
    id: 'administracion',
    title: 'administracion',
    translate: 'ADMINISTRACIÓN',
    type: 'group',
    auth: authRoles.admin,
    icon: 'apps',
    children: [
      {
        id: 'usuarios',
        title: 'usuarios',
        translate: 'Usuarios',
        type: 'item',
        auth: authRoles.admin,
        icon: 'people',
        url: 'apps/contacts/all',
      },
      {
        id: 'datos',
        title: 'datos',
        translate: 'Datos',
        type: 'item',
        auth: authRoles.admin,
        icon: 'content_paste',
        url: 'apps/datos',
      },
      {
        id: 'carga_datos',
        title: 'carga_datos',
        translate: 'carga_datos',
        type: 'item',
        icon: 'note_add',
        url: 'apps/carga_datos',
      },
      {
        id: 'avisos',
        title: 'avisos',
        translate: 'Avisos',
        type: 'item',
        auth: authRoles.admin,
        icon: 'sms_failed',
        url: 'apps/datos',
      },
      {
        id: 'carga masiva',
        title: 'carga masiva',
        translate: 'carga_masiva',
        type: 'item',
        auth: authRoles.admin,
        icon: 'upload', 
        url: 'apps/upload',
      },
    ],
  },
]

export default navigationConfig;

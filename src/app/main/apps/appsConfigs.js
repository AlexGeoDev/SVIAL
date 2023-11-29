import AcademyAppConfig from './academy/AcademyAppConfig';
import AccidentalidadAppConfig from './accidentalidad/AccidentalidadAppConfig';
import AccidentesAppConfig from './accidentes/AccidentesAppConfig';
import CalendarAppConfig from './calendar/CalendarAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import AnalyticsDashboardAppConfig from './dashboards/analytics/AnalyticsDashboardAppConfig';
import ProjectDashboardAppConfig from './dashboards/project/ProjectDashboardAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import MailAppConfig from './mail/MailAppConfig';
import NotesAppConfig from './notes/NotesAppConfig';
import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';
import TodoAppConfig from './todo/TodoAppConfig';

const appsConfigs = [
  AccidentalidadAppConfig,
  AccidentesAppConfig,
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  MailAppConfig,
  TodoAppConfig,
  FileManagerAppConfig,
  ContactsAppConfig,
  CalendarAppConfig,
  ScrumboardAppConfig,
  AcademyAppConfig,
  NotesAppConfig,
];

export default appsConfigs;

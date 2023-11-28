import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import data from 'app/main/apps/store/dataSlice';
import maps from 'app/main/apps/store/mapsSlice';
import tables from 'app/main/apps/store/tablesSlice';
import tabs from 'app/main/apps/store/tabsSlice';
import tune  from 'app/main/apps/store/tuneSlice';
import consultas from 'app/main/apps/store/consultasSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    data,
    maps,
    tables,
    tabs,
    tune,
    consultas,
    fuse,
    i18n,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'auth/user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;

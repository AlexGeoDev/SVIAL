import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import accidentalidad from 'app/main/apps/accidentalidad/store';
import apps from 'app/main/apps/store/appsSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    accidentalidad,
    apps,
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

import { combineReducers } from '@reduxjs/toolkit';
import apps from './appsSlice';

const reducer = combineReducers({
  apps,
});

export default reducer;

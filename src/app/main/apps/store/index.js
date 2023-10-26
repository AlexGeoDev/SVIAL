import { combineReducers } from '@reduxjs/toolkit';
import data from './dataSlice';
import maps from './mapsSlice';
import tables from './tablesSlice';
import tabs from './tabsSlice';
import tune from './tuneSlice';

const reducer = combineReducers({
  data,
  maps,
  tables,
  tabs,
  tune,
});

export default reducer;

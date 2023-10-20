import { combineReducers } from '@reduxjs/toolkit';
import accidentalidad from './accidentalidadSlice';
import accidentalidadMap from './accidentalidadMapSlice';
import accidentalidadData from './accidentalidadDataSlice';
import accidentalidadTables from './accidentalidadTablesSlice';

const reducer = combineReducers({
  accidentalidad,
  accidentalidadMap,
  accidentalidadData,
  accidentalidadTables,
});

export default reducer;

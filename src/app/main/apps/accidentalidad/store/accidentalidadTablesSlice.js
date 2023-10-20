import { createSlice } from "@reduxjs/toolkit";

const accidentalidadTablesSlice = createSlice({
  name: 'accidentalidadTables',
  initialState: {showTables: true},
  reducers: {
    tablesVisibility: (state) => {
      state.showTables = !state.showTables;
    }
  }
})

export const {tablesVisibility} = accidentalidadTablesSlice.actions;
export default accidentalidadTablesSlice.reducer;
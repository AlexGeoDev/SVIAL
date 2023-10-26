import { createSlice } from "@reduxjs/toolkit";

const tablesSlice = createSlice({
  name: 'accidentalidadTables',
  initialState: {showTables: true},
  reducers: {
    tablesVisibility: (state) => {
      state.showTables = !state.showTables;
    }
  }
})

export const {tablesVisibility} = tablesSlice.actions;
export default tablesSlice.reducer;
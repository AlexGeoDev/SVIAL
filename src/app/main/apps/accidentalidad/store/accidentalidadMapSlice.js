import { createSlice } from "@reduxjs/toolkit";

const accidentalidadMapSlice = createSlice({
  name: 'accidentalidadMap',
  initialState: {showMap: true},
  reducers: {
    mapVisibility: (state) => {
      state.showMap = !state.showMap;
    }
  }
})

export const { mapVisibility } = accidentalidadMapSlice.actions;
export default accidentalidadMapSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: 'accidentalidadMap',
  initialState: {showMap: true},
  reducers: {
    mapVisibility: (state) => {
      state.showMap = !state.showMap;
    }
  }
})

export const { mapVisibility } = mapSlice.actions;
export default mapSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const accidentalidadDataSlice = createSlice({
  name: 'accidentalidadData',
  initialState: {showData: true},
  reducers: {
    dataVisibility: (state) => {
      state.showData = !state.showData;
    }
  }
})

export const {dataVisibility} = accidentalidadDataSlice.actions;
export default accidentalidadDataSlice.reducer;
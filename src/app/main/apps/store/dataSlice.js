import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: 'accidentalidadData',
  initialState: {showData: true},
  reducers: {
    dataVisibility: (state) => {
      state.showData = !state.showData;
    }
  }
})

export const {dataVisibility} = dataSlice.actions;
export default dataSlice.reducer;
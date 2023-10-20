import { createSlice } from "@reduxjs/toolkit";

const accidentalidadSlice = createSlice({
  name: 'accidentalidad',
  initialState: {showTabs: true},
  reducers: {
    toggleTabsVisibility: (state) => {
      state.showTabs = !state.showTabs;
    }
  }
})

export const {toggleTabsVisibility} = accidentalidadSlice.actions;
export default accidentalidadSlice.reducer;
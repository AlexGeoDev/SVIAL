import { createSlice } from "@reduxjs/toolkit";

const appsSlice = createSlice({
  name: 'Tune',
  initialState: {showTune: true},
  reducers: {
    tuneVisibility: (state) => {
      state.showTune = !state.showTune;
    }
  }
})

export const {tuneVisibility} = appsSlice.actions;
export default appsSlice.reducer;
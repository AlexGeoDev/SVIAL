import { createSlice } from "@reduxjs/toolkit";

const tuneSlice = createSlice({
  name: 'Tune',
  initialState: {showTune: true},
  reducers: {
    tuneVisibility: (state) => {
      state.showTune = !state.showTune;
    }
  }
})

export const {tuneVisibility} = tuneSlice.actions;
export default tuneSlice.reducer;
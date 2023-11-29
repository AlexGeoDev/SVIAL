import { createSlice } from "@reduxjs/toolkit";

const consultasSlice = createSlice({
  name: 'consultas',
  initialState: {
    tramoGeoJson: null,
    puntosAccidentes: null,
  },
  reducers: {
    setTramoGeoJson: (state, action) => {
      state.tramoGeoJson = action.payload;
    },
    setPuntosAccidentes: (state, action) => {
      state.puntosAccidentes = action.payload;
    },
  }
})

export const {setTramoGeoJson, setPuntosAccidentes} = consultasSlice.actions;
export default consultasSlice.reducer;
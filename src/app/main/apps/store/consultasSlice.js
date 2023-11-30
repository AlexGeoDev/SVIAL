import { createSlice } from "@reduxjs/toolkit";

const consultasSlice = createSlice({
  name: "consultas",
  initialState: {
    tramoGeoJson: null,
    puntosAccidentes: null,
    selectedProvincia: "",
    selectedCarretera: "",
    pk_inicio: null,
    pk_fin: null,
    selectedStartDate: null,
    selectedEndDate: null,
  },
  reducers: {
    setTramoGeoJson: (state, action) => {
      state.tramoGeoJson = action.payload;
    },
    setPuntosAccidentes: (state, action) => {
      state.puntosAccidentes = action.payload;
    },
    setSelectedProvincia: (state, action) => {
      state.selectedProvincia = action.payload;
    },
    setSelectedCarretera: (state, action) => {
      state.selectedCarretera = action.payload;
    },
    setPk_inicio: (state, action) => {
      state.pk_inicio = action.payload;
    },
    setPk_fin: (state, action) => {
      state.pk_fin = action.payload;
    },
    setSelectedStartDate: (state, action) => {
      state.selectedStartDate = action.payload;
    },
    setSelectedEndDate: (state, action) => {
      state.selectedEndDate = action.payload;
    }
  },
});

export const {
  setTramoGeoJson,
  setPuntosAccidentes,
  setSelectedProvincia,
  setSelectedCarretera,
  setPk_inicio,
  setPk_fin,
  setSelectedStartDate,
  setSelectedEndDate,
} = consultasSlice.actions;
export default consultasSlice.reducer;

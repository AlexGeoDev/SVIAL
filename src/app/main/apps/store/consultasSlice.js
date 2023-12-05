import { createSlice } from "@reduxjs/toolkit";

const consultasSlice = createSlice({
  name: "consultas",
  initialState: {
    carreteras: null,
    tramoGeoJson: {
      data: null,
      visible: true, // Add a visible property
    },
    puntosAccidentes: null,
    selectedProvincia: "",
    selectedCarretera: "",
    inputPkInicio: "",
    inputPkFin: "",
    pk_inicio: null,
    pk_fin: null,
    selectedStartDate: null,
    selectedEndDate: null,
  },
  reducers: {
    setCarreteras: (state, action) => {
      state.carreteras = action.payload;
    },
    setTramoGeoJson: (state, action) => {
      state.tramoGeoJson = action.payload;
    },
    toggleTramoGeoJsonVisibility: (state) => {
      state.tramoGeoJson.visible = !state.tramoGeoJson.visible;
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
    setInputPkInicio: (state, action) => {
      state.inputPkInicio = action.payload;
    },
    setInputPkFin: (state, action) => {
      state.inputPkFin = action.payload;
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
    },
  },
});

export const {
  setCarreteras,
  setTramoGeoJson,
  toggleTramoGeoJsonVisibility,
  setPuntosAccidentes,
  setSelectedProvincia,
  setSelectedCarretera,
  setPk_inicio,
  setPk_fin,
  setSelectedStartDate,
  setSelectedEndDate,
  setInputPkInicio,
  setInputPkFin,
} = consultasSlice.actions;
export default consultasSlice.reducer;

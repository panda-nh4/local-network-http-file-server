import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basePath: localStorage.getItem('basePath')||"",
  currentPath: localStorage.getItem('curPath')||"",
  selectionBasePath: "",
  selectionCurrentPath: "",
};

const pathSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.currentPath = action.payload;
      localStorage.setItem('curPath', action.payload)
    },
    setBasePath: (state, action) => {
      state.basePath = action.payload;
      state.currentPath = "";
      localStorage.setItem('curPath', "")
      localStorage.setItem('basePath', action.payload)
    },
    resetSelectionPath: (state) => {
      state.selectionBasePath = "";
      state.selectionCurrentPath = "";
    },
    setSelectionPath: (state, action) => {
      state.selectionBasePath = action.payload.basePath;
      state.selectionCurrentPath = action.payload.currentPath;
    },
    setSelectionCurrentPath:(state, action) => {
      state.selectionCurrentPath = action.payload.currentPath;
    },
  },
});

export const { setPath, setBasePath, setSelectionPath, resetSelectionPath ,setSelectionCurrentPath} =
  pathSlice.actions;
export default pathSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify'

const initialState = {
  status: "idle",
  err: null,
  errMssg: "",
};

const renameF = createAsyncThunk("rename/file", async (target) => {
  if (target.isFolder) {
    const response = await axios.post("/dir/rename", target.body);
    return response.data;
  } else {
    const response = await axios.post("/file/rename", target.body);
    return response.data;
  }
  
});

const renameSlice = createSlice({
  name: "rename",
  initialState,
  reducers: {
    resetErrs: (state) => {
      state.err = null;
      state.errMssg = "";
      state.status="idle"
    },
  },
  extraReducers(builder) {
    builder.addCase(renameF.pending, (state) => {
        state.status="loading"
    }).addCase(renameF.fulfilled,(state,action)=>{
       if (action.payload.err){
        toast.warn("Could not rename: ".concat(action.payload.err))
       }else{
        state.status="success"
        toast.success("Renamed successfully")}
    }).addCase(renameF.rejected,(state,action)=>{
        state.err=action.error.message
        toast.warn('Could not rename.');
    });
  },
});

export { renameF};
export const {resetErrs } = renameSlice.actions;
export default renameSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  err: null,
  errMssg: "",
};

const createDir = createAsyncThunk("create/folder", async (target) => {
  const response = await axios.post("/dir/create", target);
  return response.data;
});

const newFolderSlice = createSlice({
  name: "createDir",
  initialState,
  reducers: {
    resetCreateDirErrs: (state) => {
      state.err = null;
      state.errMssg = "";
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createDir.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDir.fulfilled, (state, action) => {
        state.status = "success";
        toast.success("Created successfully");
      })
      .addCase(createDir.rejected, (state, action) => {
        state.err = action.error.message;
        toast.warn("Could not create");
      });
  },
});

export { createDir };
export const { resetCreateDirErrs } = newFolderSlice.actions;
export default newFolderSlice.reducer;

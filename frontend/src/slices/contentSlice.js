import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  content: [],
  status: "idle", //idle | loading | success | failed
  error: null,
};

const getContents = createAsyncThunk("contents/getContents", async (target) => {
  const response = await axios.post('/dir/view',{dir:target});
  return response.data;
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setIdle: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getContents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getContents.fulfilled, (state, action) => {
        state.status = "success";
        state.content = action.payload;
      })
      .addCase(getContents.rejected, (state, action) => {
        state.status = "fail";
        state.error=action.error.message
      });
  },
});

export {getContents}
export const {setIdle}=contentSlice.actions
export default contentSlice.reducer
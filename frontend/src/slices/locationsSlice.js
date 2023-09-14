import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  locations: [],
  status: "idle",
  error: null,
};

const getLocations = createAsyncThunk(
  "locations/getLocations",
  async () => {
    const response = await axios.post("/media/locations");
    return response.data;
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    reloadLocations: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLocations.pending, (state, action) => {
        state.status = "loading";
        state.locations = ["Loading"];
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.status = "success";
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.status = "failed";
        state.locations = ["???"];
      });
  },
});

export { getLocations };
export const { reloadLocations } = locationsSlice.actions;
export default locationsSlice.reducer;

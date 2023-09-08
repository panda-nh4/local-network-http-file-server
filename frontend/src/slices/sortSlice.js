import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: "Name",
  sortAscending: true,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.sortAscending=true
    },
    setSortAscending: (state, action) => {
        state.sortAscending = action.payload;
      },
  },
});

export const {setSortBy,setSortAscending}=sortSlice.actions
export default sortSlice.reducer

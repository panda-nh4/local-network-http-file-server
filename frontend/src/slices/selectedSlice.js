import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [],
  numberSelected: 0,
  selectedSize: 0,
  allSelected: false,
  totalItems: 0,
};

const selectedSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    selectOne: (state, action) => {
      state.selectedItems = [...state.selectedItems, action.payload.fName];
      state.numberSelected += 1;
      state.selectedSize += action.payload.fSize;
      if (state.numberSelected === state.totalItems) {
        state.allSelected = true;
      }
      console.log(
        state.selectedItems,
        state.selectedSize,
        state.numberSelected,
        state.allSelected
      );
    },
    deselectOne: (state, action) => {
      state.selectedItems = state.selectedItems.filter((_) => {
        if (_ === action.payload.fName) return false;
        return true;
      });
      state.numberSelected -= 1;
      state.selectedSize -= action.payload.fSize;
      state.allSelected = false;
      console.log(
        state.selectedItems,
        state.selectedSize,
        state.numberSelected,
        state.allSelected
      );
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      //   console.log(state.totalItems)
    },
    resetSelected: (state) => {
      state.selectedItems = [];
      state.numberSelected = 0;
      state.selectedSize = 0;
      state.allSelected = false;
    },
    selectAllItems: (state) => {
      state.allSelected = true;
    },
  },
});
export const {
  selectOne,
  deselectOne,
  setTotalItems,
  resetSelected,
  selectAllItems,
} = selectedSlice.actions;
export default selectedSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./slices/viewSlice";
import pathReducer from "./slices/pathSlice";
import contentReducer from "./slices/contentSlice";
import sortReducer from "./slices/sortSlice";
import selectedReducer from "./slices/selectedSlice";
import locationsReducer from "./slices/locationsSlice";

const store = configureStore({
  reducer: {
    view: viewReducer,
    path: pathReducer,
    contents: contentReducer,
    sortContent: sortReducer,
    select: selectedReducer,
    location: locationsReducer,
  },
  // middleware:(getDefaultMiddleware)=>{getDefaultMiddleware()},
  devTools: true,
});

export default store;

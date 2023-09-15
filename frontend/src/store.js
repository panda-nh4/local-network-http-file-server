import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./slices/viewSlice";
import pathReducer from "./slices/pathSlice";
import contentReducer from "./slices/contentSlice";
import sortReducer from "./slices/sortSlice";
import selectedReducer from "./slices/selectedSlice";
import locationsReducer from "./slices/locationsSlice";
import overlayReducer from "./slices/overLaySlice";
import renameReducer from "./slices/renameSlice";

const store = configureStore({
  reducer: {
    view: viewReducer,
    path: pathReducer,
    contents: contentReducer,
    sortContent: sortReducer,
    select: selectedReducer,
    location: locationsReducer,
    overlay: overlayReducer,
    rename: renameReducer,
  },
  // middleware:(getDefaultMiddleware)=>{getDefaultMiddleware()},
  devTools: true,
});

export default store;

import {configureStore} from '@reduxjs/toolkit'
import viewReducer from './slices/viewSlice'
import pathReducer from "./slices/pathSlice"

const store =configureStore({
    reducer:{
        view:viewReducer,
        path:pathReducer,
    },
    // middleware:(getDefaultMiddleware)=>{getDefaultMiddleware()},
    devTools:true,
})

export default store;
import {configureStore} from '@reduxjs/toolkit'
import viewReducer from './slices/viewSlice'
import pathReducer from "./slices/pathSlice"
import contentReducer from './slices/contentSlice'
import sortReducer from './slices/sortSlice'

const store =configureStore({
    reducer:{
        view:viewReducer,
        path:pathReducer,
        contents: contentReducer,
        sortContent:sortReducer,
    },
    // middleware:(getDefaultMiddleware)=>{getDefaultMiddleware()},
    devTools:true,
})

export default store;
import {configureStore} from '@reduxjs/toolkit'
import viewReducer from './slices/viewSlice'

const store =configureStore({
    reducer:{
        view:viewReducer,
    },
    // middleware:(getDefaultMiddleware)=>{getDefaultMiddleware()},
    devTools:true,
})

export default store;
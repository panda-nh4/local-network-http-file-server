import {  createSlice } from "@reduxjs/toolkit";


const initialState={
    basePath:"",
    currentPath: ""
}

const pathSlice=createSlice({
    name:'view',
    initialState,
    reducers:{
        setPath: (state,action)=>{
            state.currentPath=action.payload
        },
        setBasePath:(state,action)=>{
            state.basePath=action.payload
            state.currentPath=""
        }
    }
})


export const {setPath,setBasePath} =pathSlice.actions;
export default pathSlice.reducer;
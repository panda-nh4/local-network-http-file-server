import {  createSlice } from "@reduxjs/toolkit";


const initialState={
    basePath:"",
    currentPath: "TestFolder"
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
        }
    }
})


export const {setPath} =pathSlice.actions;
export default pathSlice.reducer;
import {  createSlice } from "@reduxjs/toolkit";


const initialState={
    currentPath: ""
}

const pathSlice=createSlice({
    name:'view',
    initialState,
    reducers:{
        setPath: (state,action)=>{
            state.currentPath=action.payload
        }
    }
})


export const {setPath} =pathSlice.actions;
export default pathSlice.reducer;
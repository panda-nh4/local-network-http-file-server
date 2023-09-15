import {  createSlice } from "@reduxjs/toolkit";


const initialState={
    hidden:true,
    type:"",
    isFolder:"",
    fName:""
    
}

const overlaySlice=createSlice({
    name:'overlay',
    initialState,
    reducers:{
        setRename: (state,action)=>{
            state.type=action.payload.type
            state.isFolder=action.payload.isFolder
            state.fName=action.payload.fName
        },
        setHidden:(state,action)=>{
            state.hidden=action.payload
        }
    }
})

export const {setHidden,setRename} =overlaySlice.actions;
export default overlaySlice.reducer;
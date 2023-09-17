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
        },
        setNewDir:(state,action)=>{
            state.type=action.payload.type
            state.isFolder=""
            state.fName=""
        },
        setDeleteOne:(state,action)=>{
            state.type=action.payload.type
            state.isFolder=action.payload.isFolder
            state.fName=action.payload.fName
        }
    }
})

export const {setHidden,setRename,setNewDir,setDeleteOne} =overlaySlice.actions;
export default overlaySlice.reducer;
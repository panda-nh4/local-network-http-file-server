import {  createSlice } from "@reduxjs/toolkit";


const initialState={
    listview:true
}

const viewSlice=createSlice({
    name:'view',
    initialState,
    reducers:{
        changeView: (state)=>{
            state.listview=!state.listview
        }
    }
})


export const {changeView} =viewSlice.actions;
export default viewSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    
  };

  const downloadFiles = createAsyncThunk(
    "download/downloadFiles",
    async (target) => {
      axios.post("/file/download");
    }
  );
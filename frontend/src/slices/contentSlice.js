import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  content: [],
  status: "idle", //idle | loading | success | failed
  error: null,
  foldersInCurrentDir: 0,
  filesInCurrentDir: 0,
  currentFolderSize: 0,
};

const getContents = createAsyncThunk("contents/getContents", async (target) => {
  const response = await axios.post("/dir/view", { dir: target });
  return response.data;
});

const getFolderSize = createAsyncThunk(
  "contents/getFolderSize",
  async (target) => {
    const response = await axios.post("/dir/getSize", { dir: target });
    return response.data;
  }
);


const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setIdle: (state) => {
      state.status = "idle";
    },
    resetContentSizes:(state)=>{
      state.contentSizes= {
        status: "idle",
        folders: [],
        files: [],
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getContents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getContents.fulfilled, (state, action) => {
        state.status = "success";
        state.content = action.payload;
        state.foldersInCurrentDir = action.payload.folders.length;
        state.filesInCurrentDir = action.payload.files.length;
      })
      .addCase(getContents.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(getFolderSize.pending, (state, action) => {
        state.currentFolderSize = "...";
      })
      .addCase(getFolderSize.fulfilled, (state, action) => {
        const sizes = [
          "Bytes",
          "KiB",
          "MiB",
          "GiB",
          "TiB",
          "PiB",
          "EiB",
          "ZiB",
          "YiB",
        ];
        const bytes = action.payload.size;
        if (bytes > 0) {
          const index = Math.floor(Math.log(bytes) / Math.log(1024));
          state.currentFolderSize = `${parseFloat(
            (bytes / Math.pow(1024, index)).toFixed(2)
          )} ${sizes[index]}`;
        } else {
          state.currentFolderSize = "0 Bytes";
        }
      })
      .addCase(getFolderSize.rejected, (state, action) => {
        state.currentFolderSize = "???";
      });
  },
});

export { getContents, getFolderSize };
export const { setIdle ,resetContentSizes} = contentSlice.actions;
export default contentSlice.reducer;

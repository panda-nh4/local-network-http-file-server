import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  err: null,
  errMssg: "",
};

const deleteFile = createAsyncThunk("delete/file", async (target) => {
  const response = await axios.post("/file/delete", target);
  return response.data;
});

const deleteFolder = createAsyncThunk("delete/folder", async (target) => {
  const response = await axios.post("/dir/delete", target);
  return response.data;
});
const multiDelete = createAsyncThunk("delete/multiple", async (target) => {
  const folderResponse = await axios.post("/dir/delete", target.folderReqBody);
  const fileResponse = await axios.post("/file/delete", target.fileReqBody);
  const finalResponse = {
    successfullyDeleted: [
      ...folderResponse.data.successfullyDeleted,
      ...fileResponse.data.successfullyDeleted,
    ],
    unableToDelete: [
      ...folderResponse.data.unableToDelete,
      ...fileResponse.data.unableToDelete,
    ],
    doesNotExist: [...folderResponse.data.doesNotExist,... fileResponse.data.doesNotExist],
  };
  return finalResponse;
});

const deleteSlice = createSlice({
  name: "createDir",
  initialState,
  reducers: {
    resetDeleteErrs: (state) => {
      state.err = null;
      state.errMssg = "";
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.successfullyDeleted.length > 0)
          toast.success(
            "Deleted ".concat(
              action.payload.successfullyDeleted.length,
              " file/files"
            )
          );
        if (action.payload.unableToDelete.length !== 0)
          toast.warn(
            "Could not delete ".concat(
              action.payload.unableToDelete.length,
              "  file/files ",
              action.payload.unableToDelete.toString()
            )
          );
        if (action.payload.doesNotExist.length !== 0)
          toast.warn(
            "Does not exist : ".concat(
              action.payload.doesNotExist.length,
              " files",
              action.payload.doesNotExist.toString()
            )
          );
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.err = action.error.message;
        toast.warn("Could not delete.");
      })
      .addCase(deleteFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.successfullyDeleted.length > 0)
          toast.success(
            "Deleted ".concat(
              action.payload.successfullyDeleted.length,
              " folder/folders"
            )
          );
        if (action.payload.unableToDelete.length !== 0)
          toast.warn(
            "Could not delete ".concat(
              action.payload.unableToDelete.length,
              " folder/folders: ",
              action.payload.unableToDelete.toString()
            )
          );
        if (action.payload.doesNotExist.length !== 0)
          toast.warn(
            "Does not exist : ".concat(
              action.payload.doesNotExist.length,
              " folder/folders: ",
              action.payload.doesNotExist.toString()
            )
          );
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.err = action.error.message;
        toast.warn("Could not delete.");
      })
      .addCase(multiDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(multiDelete.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.successfullyDeleted.length > 0)
          toast.success(
            "Deleted ".concat(
              action.payload.successfullyDeleted.length,
              " items"
            )
          );
        if (action.payload.unableToDelete.length !== 0)
          toast.warn(
            "Could not delete ".concat(
              action.payload.unableToDelete.length,
              "  items ",
              action.payload.unableToDelete.toString()
            )
          );
        if (action.payload.doesNotExist.length !== 0)
          toast.warn(
            "Does not exist : ".concat(
              action.payload.doesNotExist.length,
              " items",
              action.payload.doesNotExist.toString()
            )
          );
      })
      .addCase(multiDelete.rejected, (state, action) => {
        state.err = action.error.message;
        toast.warn("Could not delete.".concat(state.err));
      });
  },
});

export { deleteFile, deleteFolder ,multiDelete};
export const { resetDeleteErrs } = deleteSlice.actions;
export default deleteSlice.reducer;

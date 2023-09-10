import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTotalItems } from "../slices/selectedSlice";

const ContentInfoBarComponent = () => {
  const numberOfFiles = useSelector(
    (state) => state.contents.filesInCurrentDir
  );
  const numberOfFolders = useSelector(
    (state) => state.contents.foldersInCurrentDir
  );
  const dirSize = useSelector((state) => state.contents.currentFolderSize);
      const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTotalItems(numberOfFiles + numberOfFolders));
  },[numberOfFiles,numberOfFolders]);


  return (
    <div
      style={{
        display: "inline-flex",
        width: "100%",
        background: "white",
        color: "gray",
        justifyContent: "right",
        paddingLeft: "3%",
        paddingRight: "3%",
      }}
    >
      Files: {numberOfFiles} Folders: {numberOfFolders} Size: {dirSize}
    </div>
  );
};

export default ContentInfoBarComponent;

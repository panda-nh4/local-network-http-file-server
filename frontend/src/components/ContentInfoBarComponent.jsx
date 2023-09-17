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
  const selectedF = useSelector((state) => state.select.numberSelected);
  const selectedSize = useSelector((state) => state.select.selectedSize);
  const dirSize = useSelector((state) => state.contents.currentFolderSize);
  const dispatch = useDispatch();
  const getSize = (bytes) => {
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
    if (bytes > 0) {
      const index = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(2))} ${
        sizes[index]
      }`;
    } else {
      return "0 Bytes";
    }
  };
  useEffect(() => {
    dispatch(setTotalItems(numberOfFiles + numberOfFolders));
  }, [numberOfFiles, numberOfFolders, selectedF]);

  const content =
    selectedF === 0 ? (
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
    ) : (
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
        Selected: {selectedF} Selected Size: {getSize(selectedSize)}
      </div>
    );

  return content;
};

export default ContentInfoBarComponent;

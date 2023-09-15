import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "../slices/overLaySlice";

const RenameComponent = () => {
  const hidden = useSelector((state) => state.overlay.hidden);
  const type = useSelector((state) => state.overlay.type);
  const isFolder = useSelector((state) => state.overlay.isFolder);
  const fName = useSelector((state) => state.overlay.fName);
  const dispatch = useDispatch();
  var spacedTitle = "";
  const spacesToAdd = Math.floor(fName.length / 15);
  for (let i = 0; i < spacesToAdd; i++) {
    spacedTitle = spacedTitle + fName.substring(i * 15, (i + 1) * 15) + " ";
  }
  spacedTitle =
    spacedTitle.substring(0, spacedTitle.length - 1) +
    fName.substring(spacesToAdd * 15);
  var displayTitle = type.concat(
    " ",
    isFolder ? "Folder " : "File ",
    spacedTitle,
    " to : "
  );
  const closeOverlay = () => {
    dispatch(setHidden(true));
  };
  return (
    <div
      style={{
        display: hidden ? "none" : "flex",
        position: "fixed",
        height: "100%",
        width: "100%",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "white",
          display: "flex",
          border: "2px",
          borderStyle: " solid",
          borderColor: "#313539",
          borderRadius: "15px",
          justifyContent: "space-between",
          paddingTop:"10px",
          paddingBottom:"5px"
        }}
      >
        <div style={{ width: "80%", paddingLeft: "3%", paddingBottom: "2%" }}>
          <div style={{ display: "inline-flex" }}>{displayTitle}</div>
          <input style={{ marginLeft: "2px" }} type="text" />
        </div>
        <button
          type="button"
          className="btn-close text-reset"
          aria-label="Close"
          style={{ paddingRight: "3%", paddingRight: "8%" }}
          onClick={() => closeOverlay()}
        />
      </div>
    </div>
  );
};

export default RenameComponent;

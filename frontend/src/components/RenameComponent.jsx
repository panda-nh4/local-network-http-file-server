import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "../slices/overLaySlice";
import Button from "react-bootstrap/esm/Button";
import { renameF, resetErrs } from "../slices/renameSlice";
import { setIdle } from "../slices/contentSlice";
import { toast } from "react-toastify";

const OverlayComponent = () => {
  const hidden = useSelector((state) => state.overlay.hidden);
  const type = useSelector((state) => state.overlay.type);
  const isFolder = useSelector((state) => state.overlay.isFolder);
  const fName = useSelector((state) => state.overlay.fName);
  const dispatch = useDispatch();
  var spacedTitle = "";
  const [newName, setNewName] = useState(fName);
  const base = useSelector((state) => state.path.basePath);
  const dir = useSelector((state) => state.path.currentPath);
  const spacesToAdd = Math.floor(fName.length / 15);
  const status = useSelector((state) => state.rename.status);
  useEffect(() => {
    setNewName(fName);
    if (status === "success") {
      dispatch(setIdle());
      dispatch(resetErrs());
      closeOverlay();
    }
  }, [hidden, status]);
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
    setNewName("");
  };
  const rename = () => {
    if (newName === fName) toast("Names are same.");
    else {
      const reqBody = {
        body: { base: base, dir: dir, fname: fName, newName },
        isFolder,
      };
      dispatch(renameF(reqBody));
    }
  };
  let contentFrag = <></>;
  if (type === "Rename") {
    contentFrag = (
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
          paddingTop: "10px",
          paddingBottom: "5px",
        }}
      >
        <div style={{ width: "80%", paddingLeft: "3%", paddingBottom: "2%" }}>
          <div style={{ display: "inline-flex" }}>{displayTitle}</div>
          <input
            style={{
              margin: "5px",
              marginLeft: "0px",
              width: "100%",
              padding: "5px",
            }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
          />
          <Button
            variant="light"
            style={{
              backgroundColor: "white",
              paddingLeft: "10px",
              margin: "5px",
              marginLeft: "0px",
            }}
            onClick={() => rename()}
          >
            Rename
          </Button>
        </div>
        <button
          type="button"
          className="btn-close text-reset"
          aria-label="Close"
          style={{ paddingRight: "3%", paddingRight: "8%" }}
          onClick={() => closeOverlay()}
        />
      </div>
    );
  }
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
      {contentFrag}
    </div>
  );
};

export default OverlayComponent;

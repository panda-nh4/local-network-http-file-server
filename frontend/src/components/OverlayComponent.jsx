import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "../slices/overLaySlice";
import Button from "react-bootstrap/esm/Button";
import { renameF, resetErrs } from "../slices/renameSlice";
import { setIdle } from "../slices/contentSlice";
import { toast } from "react-toastify";
import { createDir, resetCreateDirErrs } from "../slices/newFolderSlice";
import { deleteFile, deleteFolder, resetDeleteErrs } from "../slices/deleteSlice";

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
  const renameStatus = useSelector((state) => state.rename.status);
  const createFolderStatus = useSelector((state) => state.newFolder.status);
  const deleteStatus = useSelector((state) => state.delete.status);
  useEffect(() => {
    if (type === "Rename") {
      setNewName(fName);
      if (renameStatus === "success") {
        dispatch(setIdle());
        dispatch(resetErrs());
        closeOverlay();
      }
    } else if (type === "Create") {
      if (createFolderStatus === "success") {
        dispatch(setIdle());
        dispatch(resetCreateDirErrs());
        closeOverlay();
      }
    } else if (type === "DeleteOne") {
      if (deleteStatus === "success") {
        dispatch(setIdle());
        dispatch(resetDeleteErrs());
        closeOverlay();
      }
    }
  }, [hidden, renameStatus, createFolderStatus,deleteStatus]);
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
  const createFolder = () => {
    const reqBody = { base: base, dir: dir, name: newName };
    dispatch(createDir(reqBody));
  };
  const deleteOne = () => {
    const reqBody = { paths: [{ base, dir, fname: fName }] };
    isFolder ? dispatch(deleteFolder(reqBody)) : dispatch(deleteFile(reqBody));
  };
  const deleteMany = () => {
    const paths = [];
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
  } else if (type === "Create") {
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
          <div style={{ display: "inline-flex" }}>
            {"Create new folder named as: "}{" "}
          </div>
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
            onClick={() => createFolder()}
          >
            Create
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
  } else if (type === "DeleteOne") {
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
          <div style={{ display: "inline-flex" }}>
            {"Delete folder : "}
            {fName}
          </div>
          <div>
            <Button
              variant="light"
              style={{
                backgroundColor: "white",
                paddingLeft: "10px",
                margin: "5px",
                marginLeft: "0px",
              }}
              onClick={() => deleteOne()}
            >
              Delete
            </Button>
          </div>
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
  } else if (type === "Delete") {
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
        zIndex:"100"
      }}
    >
      {contentFrag}
    </div>
  );
};

export default OverlayComponent;

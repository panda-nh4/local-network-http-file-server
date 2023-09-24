import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "../slices/overLaySlice";
import Button from "react-bootstrap/esm/Button";
import { renameF, resetErrs } from "../slices/renameSlice";
import { setIdle } from "../slices/contentSlice";
import { toast } from "react-toastify";
import { createDir, resetCreateDirErrs } from "../slices/newFolderSlice";
import PathSelection from "./PathSelection";
import {
  deleteFile,
  deleteFolder,
  multiDelete,
  resetDeleteErrs,
} from "../slices/deleteSlice";
import { resetSelected } from "../slices/selectedSlice";
import axios from "axios";
import { resetSelectionPath } from "../slices/pathSlice";

const OverlayComponent = () => {
  const hidden = useSelector((state) => state.overlay.hidden);
  const type = useSelector((state) => state.overlay.type);
  const isFolder = useSelector((state) => state.overlay.isFolder);
  const fName = useSelector((state) => state.overlay.fName);
  const dispatch = useDispatch();
  const basePath = useSelector((state) => state.path.selectionBasePath);
  const currentPath = useSelector((state) => state.path.selectionCurrentPath);
  var spacedTitle = "";
  const [newName, setNewName] = useState(fName);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const base = useSelector((state) => state.path.basePath);
  const dir = useSelector((state) => state.path.currentPath);
  const spacesToAdd = Math.floor(fName.length / 15);
  const renameStatus = useSelector((state) => state.rename.status);
  const createFolderStatus = useSelector((state) => state.newFolder.status);
  const deleteStatus = useSelector((state) => state.delete.status);
  const contents = useSelector((state) => state.contents.content);
  const items = useSelector((state) => state.select.selectedItems);
  var uploadStatus = false;
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
    } else if (type === "DeleteOne" || type === "DeleteMany") {
      if (deleteStatus === "success") {
        dispatch(setIdle());
        dispatch(resetDeleteErrs());
        dispatch(resetSelected());
        closeOverlay();
      }
    }
  }, [hidden, renameStatus, createFolderStatus, deleteStatus, uploadStatus]);
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
    const itemNames = items.map(
      (fname) => fname.split("/")[fname.split("/").length - 1]
    );
    const selectedFileNames = contents.files
      .filter((_) => itemNames.includes(_.fName))
      .map((_) => _.fName);
    const selectedFolderNames = contents.folders
      .filter((_) => itemNames.includes(_.fName))
      .map((_) => _.fName);
    const fileReqBody = { paths: [] };
    const folderReqBody = { paths: [] };
    selectedFileNames.map((fname) =>
      fileReqBody.paths.push({ fname, dir, base })
    );
    selectedFolderNames.map((fname) =>
      folderReqBody.paths.push({ fname, dir, base })
    );
    dispatch(multiDelete({ fileReqBody, folderReqBody }));
  };
  const copyItem = () => {
    var copyReqBody;
    if (!isFolder) {
      copyReqBody = [
        {
          srcDir: {
            base,
            dir,
          },
          name: fName,
          destDir: {
            base: basePath,
            dir: currentPath,
          },
        },
      ];
      axios.post("/file/copy", copyReqBody).then(
        (res) => {
          console.log(res);
          if (res.data.filesCopied.length === 1) {
            toast.success("Copied 1 file");
            closeOverlay();
            dispatch(resetSelectionPath());
          } else toast.warn("Unable to copy.");
        },
        (err) => {
          toast.warn("Network error.");
        }
      );
    } else {
      copyReqBody = [
        {
          srcDir: {
            base,
            dir: dir.concat("/", fName),
          },
          name: fName,
          destDir: {
            base: basePath,
            dir: currentPath.concat("/", fName),
          },
        },
      ];
      axios.post("/dir/copy", copyReqBody).then(
        (res) => {
          console.log(res);
          if (res.data.dirs_copied.length === 1) {
            toast.success("Copied 1 folder");
            closeOverlay();
            dispatch(resetSelectionPath());
          } else toast.warn("Unable to copy.");
        },
        (err) => {
          toast.warn("Network error.");
        }
      );
    }
  };
  const copyItems = () => {
    const itemNames = items.map(
      (fname) => fname.split("/")[fname.split("/").length - 1]
    );
    const selectedFileNames = contents.files
      .filter((_) => itemNames.includes(_.fName))
      .map((_) => _.fName);
    const selectedFolderNames = contents.folders
      .filter((_) => itemNames.includes(_.fName))
      .map((_) => _.fName);
    const fileReqBody = [];
    const folderReqBody = [];
    selectedFileNames.map((fname) =>
      fileReqBody.push({
        srcDir: {
          base,
          dir,
        },
        name: fname,
        destDir: {
          base: basePath,
          dir: currentPath,
        },
      })
    );
    selectedFolderNames.map((fname) =>
      folderReqBody.push({
        srcDir: {
          base,
          dir: dir.concat("/", fname),
        },
        name: fname,
        destDir: {
          base: basePath,
          dir: currentPath.concat("/", fname),
        },
      })
    );
    // console.log(folderReqBody);
    // console.log(fileReqBody);
    var finalRes = {
      itemsCopied: [],
      itemsNotCopied: [],
    };

    var status = false;
    axios
      .post("/dir/copy", folderReqBody)
      .then(
        (res) => {
          finalRes.itemsCopied = [
            ...finalRes.itemsCopied,
            ...res.data.dirs_copied,
          ];
          finalRes.itemsNotCopied = [
            ...finalRes.itemsNotCopied,
            ...res.data.dirs_notCopied,
          ];
          // console.log(itemsCopied);
          // console.log(itemsNotCopied);
        },
        (err) => {
          status = true;
        }
      )
      .then(() => {
        axios
          .post("/file/copy", fileReqBody)
          .then(
            (res) => {
              finalRes.itemsCopied = [
                ...finalRes.itemsCopied,
                ...res.data.filesCopied,
              ];
              finalRes.itemsNotCopied = [
                ...finalRes.itemsNotCopied,
                ...res.data.filesNotCopied,
              ];
            },
            (err) => {
              status = true;
            }
          )
          .then(() => {
            console.log(finalRes.itemsCopied);
            if (status) toast.warn("Network error.");
            if (finalRes.itemsCopied.length > 0) {
              console.log("reached");
              toast.success("Copied " + finalRes.itemsCopied.length + " items");
            }
            if (finalRes.itemsNotCopied.length > 0)
              toast.warn(
                "Unable to copy: " + finalRes.itemsNotCopied.toString()
              );
          });
      });

    closeOverlay();
    dispatch(resetSelectionPath());
  };
  const toastId = React.useRef(null);
  const uploadFiles = () => {
    // var totalUploadSize=0
    // Array.from(filesToUpload).map((_)=>totalUploadSize+=_.size)
    // console.log(totalUploadSize)

    var formData = new FormData();
    //formData.append("files",Array.from(filesToUpload))
    Array.from(filesToUpload).map((_) => formData.append("files", _));
    formData.append("base", base);
    formData.append("dir", dir);
    axios
      .request({
        method: "post",
        url: "/file/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        onUploadProgress: (p) => {
          const progress = p.loaded / p.total;
          if (toastId.current === null) {
            toastId.current = toast("Uploading", { progress });
            if (progress === 1) toast.dismiss(toastId.current);
          } else {
            toast.update(toastId.current, { progress });
          }
        },
      })
      .then(
        (data) => {
          toast.done(toastId.current);
          toastId.current = null;
          toast.success(`Uploaded ${data.data.success_upload.length} files!`);
          closeOverlay();
          dispatch(setIdle());
        },
        (data) =>
          toast.warn(`Could not upload ${data.data.upload_error.length} files.`)
      );
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
            {isFolder ? "Delete folder : " : "Delete file : "}
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
  } else if (type === "DeleteMany") {
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
            {"Delete items: "}
            {items.map((fname) =>
              fname.split("/")[fname.split("/").length - 1].concat(" ")
            )}
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
              onClick={() => deleteMany()}
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
  } else if (type === "Upload") {
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
          <div style={{ display: "inline-flex" }}>{"Upload files: "}</div>
          <input
            style={{
              margin: "5px",
              marginLeft: "0px",
              width: "100%",
              padding: "5px",
            }}
            onChange={(e) => setFilesToUpload(e.target.files)}
            type="file"
            multiple
          />
          <Button
            variant="light"
            style={{
              backgroundColor: "white",
              paddingLeft: "10px",
              margin: "5px",
              marginLeft: "0px",
            }}
            onClick={() => uploadFiles()}
          >
            Upload
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
  } else if (type === "copyOne") {
    contentFrag = (
      <div
        style={{
          width: "80%",
          height: "80%",
          backgroundColor: "white",
          display: "flex",
          border: "2px",
          borderStyle: " solid",
          borderColor: "#313539",
          borderRadius: "15px",
          justifyContent: "space-between",
          paddingTop: "10px",
          paddingBottom: "7px",
        }}
      >
        <div style={{ width: "90%", paddingLeft: "3%", paddingBottom: "2%" }}>
          <div style={{ display: "inline-flex" }}>
            {"Copy " + fName + " to: "}
          </div>
          <div style={{ height: "90%", width: "100%" }}>
            <PathSelection />
          </div>
          <div style={{ height: "10%", width: "100%" }}>
            <Button
              variant="light"
              style={{
                backgroundColor: "white",
                paddingLeft: "10px",
                margin: "5px",
                marginLeft: "0px",
                paddingTop: "2px",
              }}
              onClick={() => copyItem()}
            >
              Copy
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="btn-close text-reset"
          aria-label="Close"
          style={{ paddingRight: "3%" }}
          onClick={() => {
            closeOverlay();
            dispatch(resetSelectionPath());
          }}
        />
      </div>
    );
  } else if (type === "copyMany") {
    contentFrag = (
      <div
        style={{
          width: "80%",
          height: "80%",
          backgroundColor: "white",
          display: "flex",
          border: "2px",
          borderStyle: " solid",
          borderColor: "#313539",
          borderRadius: "15px",
          justifyContent: "space-between",
          paddingTop: "10px",
          paddingBottom: "7px",
        }}
      >
        <div style={{ width: "90%", paddingLeft: "3%", paddingBottom: "2%" }}>
          <div style={{ display: "inline-flex" }}>
            {"Copy " + items.length + " items to: "}
          </div>
          <div style={{ height: "90%", width: "100%" }}>
            <PathSelection />
          </div>
          <div style={{ height: "10%", width: "100%" }}>
            <Button
              variant="light"
              style={{
                backgroundColor: "white",
                paddingLeft: "10px",
                margin: "5px",
                marginLeft: "0px",
                paddingTop: "2px",
              }}
              onClick={() => copyItems()}
            >
              Copy
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="btn-close text-reset"
          aria-label="Close"
          style={{ paddingRight: "3%" }}
          onClick={() => {
            closeOverlay();
            dispatch(resetSelectionPath());
          }}
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
        zIndex: "100",
      }}
    >
      {contentFrag}
    </div>
  );
};

export default OverlayComponent;

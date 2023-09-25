import React from "react";
import { BsPlusLg, BsFolderPlus, BsUpload, BsDownload } from "react-icons/bs";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { BiCopy, BiCut } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteMany, setHidden, setNewDir } from "../slices/overLaySlice";
const FabComponent = () => {
  const selectedF = useSelector((state) => state.select.numberSelected);
  const dispatch = useDispatch();
  const createFolder = () => {
    dispatch(setNewDir({ type: "Create" }));
    dispatch(setHidden(false));
  };
  const deleteSelected = () => {
    dispatch(setDeleteMany("DeleteMany"));
    dispatch(setHidden(false));
  };
  const uploadFiles = () => {
    dispatch(setDeleteMany("Upload"));
    dispatch(setHidden(false));
  };
  const copyFiles = () => {
    dispatch(setDeleteMany("copyMany"));
    dispatch(setHidden(false));
  };
  const moveFiles = () => {
    dispatch(setDeleteMany("moveMany"));
    dispatch(setHidden(false));
  };

  const fabContents =
    selectedF === 0 ? (
      <Fab
        mainButtonStyles={{ background: "#212529" }}
        // actionButtonStyles={actionButtonStyles}
        style={{ bottom: "15px", right: "17px" }}
        icon={<BsPlusLg />}
        event="click"
        // alwaysShowTitle={true}
        // onClick={someFunctionForTheMainButton}
      >
        <Action
          text="Make new folder"
          style={{ background: "#313539" }}
          onClick={() => createFolder()}
        >
          <BsFolderPlus />
        </Action>
        <Action
          text="Upload files"
          style={{ background: "#313539" }}
          onClick={() => uploadFiles()}
        >
          <BsUpload />
        </Action>
      </Fab>
    ) : (
      <Fab
        mainButtonStyles={{ background: "#212529" }}
        // actionButtonStyles={actionButtonStyles}
        style={{ bottom: "15px", right: "17px" }}
        icon={<CgMoreO />}
        event="click"
        // alwaysShowTitle={true}
        // onClick={someFunctionForTheMainButton}
      >
        <Action
          text="Copy"
          style={{ background: "#313539" }}
          onClick={() => copyFiles()}
        >
          <BiCopy />
        </Action>
        <Action
          text="Move"
          style={{ background: "#313539" }}
          onClick={() => moveFiles()}
        >
          <BiCut />
        </Action>
        <Action
          text="Delete"
          style={{ background: "#313539" }}
          onClick={() => deleteSelected()}
        >
          <RiDeleteBin6Line />
        </Action>
        <Action text="Download" style={{ background: "#313539" }}>
          <BsDownload />
        </Action>
      </Fab>
    );
  return fabContents;
};

export default FabComponent;

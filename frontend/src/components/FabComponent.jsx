import React from "react";
import { BsPlusLg, BsFolderPlus, BsUpload, BsDownload } from "react-icons/bs";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { BiCopy,BiCut } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {CgMoreO} from 'react-icons/cg'
import { useSelector } from "react-redux";
const FabComponent = () => {
  const selectedF = useSelector((state) => state.select.numberSelected);
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
        <Action text="Make new folder" style={{ background: "#313539" }}>
          <BsFolderPlus />
        </Action>
        <Action text="Upload files" style={{ background: "#313539" }}>
          <BsUpload />
        </Action>
      </Fab>
    ) : (
      <Fab
        mainButtonStyles={{ background: "#212529" }}
        // actionButtonStyles={actionButtonStyles}
        style={{ bottom: "15px", right: "17px" }}
        icon={<CgMoreO/>}
        event="click"
        // alwaysShowTitle={true}
        // onClick={someFunctionForTheMainButton}
      >
        <Action text="Copy" style={{ background: "#313539" }}>
          <BiCopy />
        </Action>
        <Action text="Move" style={{ background: "#313539" }}>
          <BiCut/>
        </Action>
        <Action text="Delete" style={{ background: "#313539" }}>
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

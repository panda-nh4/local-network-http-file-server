import React from "react";
import Header from "../components/Header";
import Contents from "../components/Contents";
import CurrentLocation from "../components/CurrentLocation";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { BsPlusLg, BsFolderPlus, BsUpload } from "react-icons/bs";
import RenameComponent from "../components/RenameComponent";
const HomeScreen = () => {
  return (
    <div style={{}}>
      <div style={{paddingBottom:"100px"}}>
        <RenameComponent />
        <Header />
        <CurrentLocation />
        <Contents />
      </div>
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
    </div>
  );
};

export default HomeScreen;

import React from "react";
import Header from "../components/Header";
import Contents from "../components/Contents";
import CurrentLocation from "../components/CurrentLocation";

import RenameComponent from "../components/RenameComponent";
import FabComponent from "../components/FabComponent";
const HomeScreen = () => {
  return (
    <div>
      <div style={{ paddingBottom: "100px" }}>
        <RenameComponent />
        <Header />
        <CurrentLocation />
        <Contents />
      </div>
      <FabComponent/>
    </div>
  );
};

export default HomeScreen;

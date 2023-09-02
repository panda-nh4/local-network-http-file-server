import React from "react";
import { BsArrowDown, BsArrowUp, BsList, BsGrid } from "react-icons/bs";
const ContentsOptions = () => {
  return (
    <div style={{
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      paddingRight: "80px",
      paddingLeft: "50px",
    }}>
    <input type="checkbox"/>
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        // paddingRight: "00px",
        paddingLeft: "10px",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Name</div>
        <div style={{paddingLeft:"7px"}}>{true ? <BsArrowDown /> : <BsArrowUp />}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Size</div>
        <div style={{paddingLeft:"7px"}}>{true ? <BsArrowDown /> : <BsArrowUp />}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Modified</div>
        <div style={{paddingLeft:"7px"}}>{true ? <BsArrowDown /> : <BsArrowUp />}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {true ? <BsGrid /> : <BsList />}
      </div>
    </div>
    </div>
  );
};

export default ContentsOptions;

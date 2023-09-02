import React from "react";
import { BsArrowDown, BsArrowUp, BsList, BsGrid } from "react-icons/bs";
const ContentsOptions = () => {
  return (
    <div style={{
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      paddingRight: "50px",
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
      
    </div>
    <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft:"100px"
        }}
      >
        {true ? <BsGrid /> : <BsList />}
      </div>
    </div>
  );
};

export default ContentsOptions;

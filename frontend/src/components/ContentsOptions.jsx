import React from "react";
import { BsArrowDown, BsArrowUp, BsList, BsGrid } from "react-icons/bs";
const ContentsOptions = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
         paddingRight: "3%",
         paddingLeft: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "4%",
          // justifyContent: "space-between",
          // paddingRight: "00px",
        }}
      >
        <input type="checkbox" />
      </div>
      <div
        style={{
          display: "flex",
          width: "86%",
          // justifyContent: "space-between",
          // paddingRight: "00px",
          paddingLeft: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "45%",
          }}
        >
          <div>Name</div>
          <div style={{ paddingLeft: "7px" }}>
            {true ? <BsArrowDown /> : <BsArrowUp />}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
          }}
        >
          <div>Size</div>
          <div style={{ paddingLeft: "7px" }}>
            {true ? <BsArrowDown /> : <BsArrowUp />}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            width: "35%",
          }}
        >
          <div>Modified</div>
          <div style={{ paddingLeft: "7px" }}>
            {true ? <BsArrowDown /> : <BsArrowUp />}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          paddingLeft: "0px",
          width:"4%"
        }}
      >
        {true ? <BsGrid /> : <BsList />}
      </div>
    </div>
  );
};

export default ContentsOptions;

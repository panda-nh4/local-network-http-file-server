import React from "react";
import ContentsOptions from "./ContentsOptions";
import ContentsActual from "./ContentsActual";

const Contents = () => {
  return (
    <>
      <ContentsOptions />
      <div
        style={{
          borderTop: "1px solid #000 ",
          marginLeft: 20,
          marginRight: 20,
        }}
      ></div>

      <ContentsActual />
    </>
  );
};

export default Contents;

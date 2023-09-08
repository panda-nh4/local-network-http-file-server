import React from "react";
import ContentsOptions from "./ContentsOptions";
import ContentsActual from "./ContentsActual";
import ContentInfoBarComponent from "./ContentInfoBarComponent";

const Contents = () => {
  return (
    <>
      <ContentsOptions />
      <div
        style={{
          borderTop: "1px solid #000 ",
          marginLeft:"3%",
          marginRight: "3%",
        }}
      ></div>
      <ContentInfoBarComponent/>
      <ContentsActual />
    </>
  );
};

export default Contents;

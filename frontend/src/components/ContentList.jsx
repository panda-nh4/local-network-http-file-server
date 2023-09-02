import React from "react";
import ContentItem from "./ContentItem";

const ContentList = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, idx) =>(
        <ContentItem/>))}
    </div>
  );
};

export default ContentList;

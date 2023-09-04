import React from "react";
import ContentItem from "./ContentItem";

const ContentList = () => {
  return (
    <div>
      {Array.from({ length: 100 }).map((_, idx) =>(
        <ContentItem key={idx}/>))}
    </div>
  );
};

export default ContentList;

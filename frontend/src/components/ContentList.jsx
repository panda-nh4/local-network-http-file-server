import React from "react";
import ContentItem from "./ContentItem";

const ContentList = ({contents}) => {
  return (
    <div>
      {contents.folders.map((_, idx) =>(
        <ContentItem key={idx} fName={_} isFolder={true}/>))}
        {contents.files.map((_, idx) =>(
        <ContentItem key={idx} fName={_} isFolder={false}/>))}
    </div>
  );
};

export default ContentList;

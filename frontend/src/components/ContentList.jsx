import React, { useEffect } from "react";
import ContentItem from "./ContentItem";
import { useSelector, useDispatch } from "react-redux";

const ContentList = ({ folders, files }) => {
  // var folderSizes=contentSizes.folders.reduce((obj,item)=>(obj[item.folderName]=item.size,obj),{})
  // console.log(contentSizes.folders)
  const sortedBy=useSelector((state)=>state.sortContent.sortBy)
  const sortAscending=useSelector((state)=>state.sortContent.sortAscending)
  var sortedFolders=[...folders]
  var sortedFiles=[...files]
  const allSelected=useSelector((state)=>state.select.allSelected)
  const sortByModified=(fList)=>{
    fList.sort((a,b)=>{
      return new Date(a.mtime).getTime()-new Date(b.mtime).getTime()
    })
    fList.sort((a,b)=>{
      return new Date(a.mtime).getTime()-new Date(b.mtime).getTime()
    })
  }
  const sortByName=(fList)=>{
    fList.sort((a,b)=>{
      return a.fName>b.fName?1:b.fName>a.fName?-1:0
    })
    fList.sort((a,b)=>{
      return a.fName>b.fName?1:b.fName>a.fName?-1:0
    })
  }
  const sortBySize=(fList)=>{
    fList.sort((a,b)=>{
      return parseInt(a.actualSize)-parseInt(b.actualSize)
    })
    fList.sort((a,b)=>{
      return parseInt(a.size)-parseInt(b.size)
    })
  }
  const sorter=()=>{
    if(sortedBy==="Name"){
      sortByName(sortedFolders);
      sortByName(sortedFiles);
    }
    else if(sortedBy==="Size"){
      sortBySize(sortedFolders);
      sortBySize(sortedFiles);
    }
    else{
      sortByModified(sortedFolders);
      sortByModified(sortedFiles);
    }
    if (!sortAscending){
      sortedFiles.reverse()
      sortedFolders.reverse()
    }
  }
  sorter();
  return (
    <div>
      {sortedFolders.map((_, idx) => (
        <ContentItem key={idx} fName={_.fName} isFolder={true} size={_.actualSize} modified={_.mtime} selected={allSelected}/>
      ))}
      {sortedFiles.map((_, idx) => (
        <ContentItem key={idx} fName={_.fName} isFolder={false} size={_.size} modified={_.mtime} selected={allSelected}/>
      ))}
    </div>
  );
};

export default ContentList;

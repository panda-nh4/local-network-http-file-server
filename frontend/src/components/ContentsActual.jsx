import React from "react";
import ContentList from "./ContentList";
import ContentCard from "./ContentCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getContents } from "../slices/contentSlice";
import { getFolderSize } from "../slices/contentSlice";
const ContentsActual = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view.listview);
  const contents = useSelector((state) => state.contents.content);
  const status = useSelector((state) => state.contents.status);
  const error = useSelector((state) => state.contents.error);
  const basePath=useSelector((state)=>state.path.basePath)
  const path = useSelector((state) => state.path.currentPath);
  const sortedBy = useSelector((state) => state.sortContent.sortBy);
  const sortAscending = useSelector((state) => state.sortContent.sortAscending);
  useEffect(() => {
    if (status === "idle") {
      dispatch(getContents({basePath,path}));
      dispatch(getFolderSize({basePath,path}));
    }
  }, [status]);
  
  let contentfrag;
  if (status === "loading") {
    contentfrag = <p>Loading...</p>;
  } else if (status === "success") {
    contentfrag = view ? (
      <ContentList folders={contents.folders} files={contents.files} />
    ) : (
      <ContentCard folders={contents.folders} files={contents.files} />
    );
  } else if (status === "fail") {
    contentfrag = error;
  }
  return <>{contentfrag}</>;
};

export default ContentsActual;

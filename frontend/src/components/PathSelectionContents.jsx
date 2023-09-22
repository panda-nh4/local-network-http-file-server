import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectionCurrentPath, setSelectionPath } from "../slices/pathSlice";
import { BsFolderFill } from "react-icons/bs";

const PathSelectionContents = ({ basePath, currentPath,folders,files }) => {
  const locations = useSelector((state) => state.location.locations);
  const dispatch = useDispatch();
  const setBase = (base) => {
    dispatch(setSelectionPath({ basePath: base, currentPath: "" }));
  };
  const setcurrentPath=(_)=>{
    const newPath=currentPath===""?_:"".concat(currentPath,"/",_)
    dispatch(setSelectionCurrentPath({currentPath:newPath}))
  }
  const contentFrag =
    basePath === "" ? (
      <div style={{ width: "100%", height:"100%"}}>
        {locations.map((_) => (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              paddingRight: "3%",
              paddingLeft: "3%",
              paddingTop: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                // justifyContent: "space-between",
                // paddingRight: "00px",
                paddingLeft: "10px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "left",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <span
                  onClick={() => setBase(_)}
                  style={{
                    display: "inline-flex",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  <BsFolderFill style={{ alignSelf: "center" }} /> &nbsp; {_}
                </span>
                <div style={{ paddingLeft: "7px" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div style={{height:"98%", width:"100%", overflow:"auto"}}>
        {folders.map((_) => (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              paddingRight: "3%",
              paddingLeft: "3%",
              paddingTop: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                // justifyContent: "space-between",
                // paddingRight: "00px",
                paddingLeft: "10px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "left",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <span
                  onClick={() => setcurrentPath(_)}
                  style={{
                    display: "inline-flex",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  <BsFolderFill style={{ alignSelf: "center" }} /> &nbsp; {_}
                </span>
                <div style={{ paddingLeft: "7px" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  return contentFrag;
};

export default PathSelectionContents;

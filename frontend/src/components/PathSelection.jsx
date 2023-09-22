import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PathSelectionContents from "./PathSelectionContents";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import { StyledBreadcrumbItem } from "./styles.jsx";
import { setSelectionCurrentPath, setSelectionPath } from "../slices/pathSlice";
import axios from "axios";
const PathSelection = () => {
  const dispatch = useDispatch();
  const basePath = useSelector((state) => state.path.selectionBasePath);
  const currentPath = useSelector((state) => state.path.selectionCurrentPath);
  const [folders, setfolders] = useState([]);
  const [files, setfiles] = useState([]);
  useEffect(() => {
    if (basePath !== "") {
      axios
        .post("/dir/view", {
          base: basePath,
          dir: currentPath,
        })
        .then(
          (res) => {
            console.log(res);
            var folderNames = [];
            var fileNames = [];
            res.data.files.map((_) => (fileNames = [...fileNames, _.fName]));
            res.data.folders.map(
              (_) => (folderNames = [...folderNames, _.fName])
            );
            setfolders(folderNames);
            setfiles(fileNames);
          },
          (err) => {
            console.log(err.message);
          }
        );
    } else {
      setfiles([]);
      setfolders([]);
    }
  }, [basePath, currentPath]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="px-3" style={{ display: "flex", overflow: "auto", width: "100%", height: "22%",}}>
        <Breadcrumb style={{ display: "flex", overflowWrap: "break-word",width:"100%"}}>
          <StyledBreadcrumbItem active>
            <Button
              variant="light"
              onClick={() => {
                dispatch(setSelectionPath({ basePath: "", currentPath: "" }));
              }}
              style={{ background: "white" }}
            >
              <span
                style={{
                  display: "block",
                  whiteSpace: "nowrap",
                  maxWidth: "150px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {basePath === "" ? "Select base" : basePath}
              </span>
            </Button>
          </StyledBreadcrumbItem>
          {currentPath.split("/").map((fname, idx) => {
            return (
              <StyledBreadcrumbItem active key={idx}>
                {console.log(currentPath)}
                {currentPath.split("/").length === idx + 1 ? (
                  <Button
                    disabled
                    variant="light"
                    style={{ background: "white" }}
                  >
                    <span
                      style={{
                        display: "block",
                        whiteSpace: "nowrap",
                        maxWidth: "150px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {fname}
                    </span>
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    onClick={() => {
                      console.log(currentPath);
                      dispatch(
                        setSelectionCurrentPath({
                          currentPath: currentPath
                            .split("/")
                            .slice(0, idx + 1)
                            .join("/"),
                        })
                      );
                    }}
                    style={{ background: "white" }}
                  >
                    <span
                      style={{
                        display: "block",
                        whiteSpace: "nowrap",
                        maxWidth: "150px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {fname}
                    </span>
                  </Button>
                )}
              </StyledBreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
      <div style={{ width: "100%", height: "80%", paddingTop:"1%"}}>
        <PathSelectionContents
          basePath={basePath}
          currentPath={currentPath}
          folders={folders}
          files={files}
        />
      </div>
    </div>
  );
};

export default PathSelection;

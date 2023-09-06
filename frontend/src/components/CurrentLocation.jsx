import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { StyledBreadcrumbItem } from "./styles.jsx";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { setPath } from "../slices/pathSlice.js";
import { setIdle } from "../slices/contentSlice.js";
const CurrentLocation = () => {
  const dispatch=useDispatch()
  const path = useSelector((state) => state.path.currentPath);
  return (
    <div className="px-3" style={{ display: "flex" }}>
      <Breadcrumb style={{ display: "flex", overflowWrap: "break-word" }}>
        <StyledBreadcrumbItem active>
          <Button variant="light" onClick={()=>{dispatch(setPath(""));dispatch(setIdle())}} style={{ background: "white" }}>
            <span
              style={{
                display: "block",
                whiteSpace: "nowrap",
                maxWidth: "150px",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Root
            </span>
          </Button>
        </StyledBreadcrumbItem>

        {path.split("/").map((fname, idx) => {
          return (
            <StyledBreadcrumbItem active key={idx}>
              {path.split("/").length === idx + 1 ? (
                <Button disabled variant="light" style={{ background: "white" }}>
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
                <Button variant="light" onClick={()=>{dispatch(setPath(path.split("/").slice(0,idx+1).join("/")));dispatch(setIdle())}} style={{ background: "white" }}>
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
  );
};



export default CurrentLocation;

import React from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import fileIcon from "../assets/file-svgrepo-com.svg";
import folderIcon from "../assets/folder-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../slices/pathSlice.js";
import { setIdle } from "../slices/contentSlice.js";
const CardItem = ({ fName, isFolder }) => {
  const iconSrc = isFolder ? folderIcon : fileIcon;
  const dispatch = useDispatch();
  const path = useSelector((state) => state.path.currentPath);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ color: "white" }}
    >
      {children}

      <BsThreeDotsVertical />
    </a>
  ));
  const clicked = (title) => {
    if (isFolder) {
      const newPath=path===""?title:path.concat("/", title);
      dispatch(setPath(newPath));
      dispatch(setIdle());
    }
    else{
      console.log("Clicked")
    }
  };
  return (
    <Card style={{ width: "11rem", height: "18rem" }} bg="dark" >
      <Card.Img variant="top" src={iconSrc}  style={{cursor:"pointer"}} onClick={() => clicked(fName)}/>
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Title style={{ color: "white" ,cursor:"pointer"}} onClick={() => clicked(fName)}>
            {fName.length > 12 ? fName.slice(0, 10).concat("...") : fName}
          </Card.Title>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <input type="checkbox" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Text style={{ color: "white" }}>
            Size
            <br />
            Modified
          </Card.Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu size="sm" title="">
                {/* <Dropdown.Header>Options</Dropdown.Header> */}
                <Dropdown.Item>Download</Dropdown.Item>
                <Dropdown.Item>Rename</Dropdown.Item>
                <Dropdown.Item>Copy</Dropdown.Item>
                <Dropdown.Item>Move</Dropdown.Item>
                <Dropdown.Item>Delete</Dropdown.Item>
                <Dropdown.Item>Properties</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardItem;

import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import fileIcon from "../assets/file-svgrepo-com.svg";
import folderIcon from "../assets/folder-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../slices/pathSlice.js";
import { setIdle } from "../slices/contentSlice.js";
import { deselectOne, selectOne } from "../slices/selectedSlice.js";
const CardItem = ({ fName, isFolder, size, modified, selected }) => {
  const iconSrc = isFolder ? folderIcon : fileIcon;
  const dispatch = useDispatch();
  const path = useSelector((state) => state.path.currentPath);
  const basePath = useSelector((state) => state.path.basePath);
  const selectedItems = useSelector((state) => state.select.selectedItems);
  const fNameToShow = fName;
  fName = path.concat("/", fName);
  const payload = {
    fName,
    fSize: size,
  };
  const qParams = new URLSearchParams();
  qParams.set("base", basePath);
  qParams.set("dir", path);
  qParams.set("fname", fNameToShow);
  const url = "/file/download?" + qParams;
  const downloadFile = () => {
    const newWindow = window.open(url, "_self", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const curDate = new Date();
  const modTime = (mdate) => {
    const mDate = new Date(mdate);
    const diff = curDate.getTime() - mDate.getTime();
    const differenceInsec = Math.floor(diff / 1000);
    if (differenceInsec < 60) return "< 1 min ago";
    if (differenceInsec < 3600)
      return `${Math.floor(differenceInsec / 60)} mins ago`;
    if (differenceInsec < 3600 * 24) {
      const hours = Math.floor(differenceInsec / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }
    if (differenceInsec < 3600 * 24 * 30) {
      const days = Math.floor(differenceInsec / (3600 * 24));
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
    if (differenceInsec < 3600 * 24 * 365) {
      const months = Math.floor(differenceInsec / (3600 * 24 * 30));
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    if (differenceInsec > 3600 * 24 * 365) {
      const years = Math.floor(differenceInsec / (3600 * 24 * 365));
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
    return "???";
  };
  const getReadableSize = (bytes) => {
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    if (bytes > 0) {
      const index = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(2))} ${
        sizes[index]
      }`;
    } else {
      return "0 B";
    }
  };
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
      const newPath = path === "" ? title : path.concat("/", title);
      dispatch(setPath(newPath));
      dispatch(setIdle());
    } else {
      console.log("Clicked");
    }
  };
  useEffect(() => {
    if (selected && !selectedItems.includes(fName))
      dispatch(selectOne(payload));
  });
  const checkboxChange = (e) => {
    if (e.target.checked) {
      dispatch(selectOne(payload));
    } else {
      dispatch(deselectOne(payload));
    }
  };
  return (
    <Card style={{ width: "11rem", height: "18rem" }} bg="dark">
      <Card.Img
        variant="top"
        src={iconSrc}
        style={{ cursor: "pointer" }}
        onClick={() => clicked(fNameToShow)}
      />
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Title
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => clicked(fNameToShow)}
          >
            {fNameToShow.length > 12
              ? fNameToShow.slice(0, 10).concat("...")
              : fNameToShow}
          </Card.Title>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <input
              type="checkbox"
              onChange={checkboxChange}
              checked={selectedItems.includes(fName)}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Text style={{ color: "white" }}>
            {getReadableSize(size)}
            <br />
            {modTime(modified)}
          </Card.Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu size="sm" title="">
                {/* <Dropdown.Header>Options</Dropdown.Header> */}
                <Dropdown.Item onClick={() => downloadFile()}>
                  Download
                </Dropdown.Item>
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

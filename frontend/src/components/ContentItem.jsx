import React, { useEffect } from "react";
import {
  BsFolderFill,
  BsDownload,
  BsThreeDotsVertical,
  BsFillFileEarmarkFill,
} from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../slices/pathSlice.js";
import { setIdle } from "../slices/contentSlice.js";
import { deselectOne, selectOne } from "../slices/selectedSlice.js";

const ContentItem = ({ fName, isFolder, size, modified, selected }) => {
  const path = useSelector((state) => state.path.currentPath);
  const fNameToShow=fName
  fName=path.concat("/",fName)
  const payload = {
    fName,
    fSize: size,
  };

  const dispatch = useDispatch();

  const curDate = new Date();
  const selectedItems = useSelector((state) => state.select.selectedItems);
  useEffect(() => {
    if (selected && !selectedItems.includes(fName))
      dispatch(selectOne(payload));
  });

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
      return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(1))} ${
        sizes[index]
      }`;
    } else {
      return "0 B";
    }
  };
  const checkboxChange = (e) => {
    if (e.target.checked) {
      dispatch(selectOne(payload));
    } else {
      dispatch(deselectOne(payload));
    }
  };

  const clicked = (title) => {
    if (isFolder) {
      const newPath = path === "" ? title : path.concat("/", title);
      dispatch(setPath(newPath));
      dispatch(setIdle());
    } else {
      console.log("Clicked"); //Add code for file clicked
    }
  };
  function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(window.innerWidth>850);
    React.useEffect(() => {
      const matchQueryList = window.matchMedia(query);
      function handleChange(e) {
        setMatches(e.matches);
      }
      matchQueryList.addEventListener("change", handleChange);
    }, [query]);
    return matches;
  }
  let isDesktop = useMediaQuery("(min-width: 850px)");  
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ color: "black" }}
    >
      {children}
      <BsThreeDotsVertical />
    </a>
  ));
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        paddingRight: "3%",
        paddingLeft: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "4%",
          justifyContent: "start",
          alignItems: "center",
          // paddingRight: "00px",
        }}
      >
        <input
          type="checkbox"
          onChange={checkboxChange}
          checked={selectedItems.includes(fName)}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "84%",
          // justifyContent: "space-between",
          // paddingRight: "00px",
          paddingLeft: "10px",
        }}
      >
        <div
          style={{
            display: "inline",
            alignItems: "center",
            justifyContent: "left",
            width: "43%",
            overflow: "hidden",
          }}
        >
          {isFolder ? (
            <span
              onClick={() => clicked(fNameToShow)}
              style={{
                display: "inline-flex",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              <BsFolderFill style={{ alignSelf: "center" }} /> &nbsp;{" "}{fNameToShow}
            </span>
          ) : (
            <span
              onClick={() => clicked(fNameToShow)}
              style={{
                display: "inline-flex",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              <BsFillFileEarmarkFill style={{ alignSelf: "center" }} /> &nbsp;{" "}
              {fNameToShow}
            </span>
          )}
          <div style={{ paddingLeft: "7px" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
          }}
        >
          <div>{getReadableSize(size)}</div>
          <div style={{ paddingLeft: "7px" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "35%",
          }}
        >
          <div>{modTime(modified)}</div>
          <div style={{ paddingLeft: "7px" }}></div>
        </div>
      </div>

      {!isDesktop ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            paddingLeft: "0px",
            width: "6%",
          }}
        >
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
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            paddingLeft: "0px",
            width: "6%",
          }}
        >
          <Button variant="light" style={{ background: "white" }}>
            <BsDownload />
          </Button>
          <Button variant="light" style={{ background: "white" }}>
            <BiCopy />
          </Button>
          <Button variant="light" style={{ background: "white" }}>
            <RiDeleteBin6Line />
          </Button>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu size="sm" title="">
              {/* <Dropdown.Header>Options</Dropdown.Header> */}
              <Dropdown.Item>Rename</Dropdown.Item>
              <Dropdown.Item>Move</Dropdown.Item>
              <Dropdown.Item>Properties</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default ContentItem;

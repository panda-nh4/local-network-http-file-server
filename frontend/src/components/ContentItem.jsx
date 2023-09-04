import React from "react";
import { BsDownload, BsThreeDotsVertical } from "react-icons/bs";
import {BiRename,BiCopy,BiCut} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
const ContentItem = () => {
  function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(true);
    React.useEffect(() => {
      const matchQueryList = window.matchMedia(query);
      function handleChange(e) {
        setMatches(e.matches);
      }
      matchQueryList.addEventListener("change", handleChange);
    }, [query]);
    return matches;
  }
  let isDesktop = !useMediaQuery("(min-width: 850px)");

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
          alignItems:"center"
          // paddingRight: "00px",
        }}
      >
        <input type="checkbox" />
      </div>
      <div
        style={{
          display: "flex",
          width: "86%",
          // justifyContent: "space-between",
          // paddingRight: "00px",
          paddingLeft: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            width: "43%",
          }}
        >
          <div>Name </div>
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
          <div>Size</div>
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
          <div>Modified</div>
          <div style={{ paddingLeft: "7px" }}></div>
        </div>
      </div>

      {isDesktop ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            paddingLeft: "0px",
            width: "4%",
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
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          paddingLeft: "0px",
          width: "6%",
        }}>
          <Button variant="light" style={{ background: "white" }}><BsDownload/></Button>
          <Button variant="light" style={{ background: "white" }}><BiCopy/></Button>
          <Button variant="light" style={{ background: "white" }}><RiDeleteBin6Line/></Button>
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

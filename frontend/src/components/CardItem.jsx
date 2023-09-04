import React from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
const CardItem = () => {
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
  return (
    <Card style={{ width: "11rem", height: "18rem" }} bg="dark">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Title style={{ color: "white" }}>File name</Card.Title>
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
          <div style={{display:"flex",alignItems:"center"}}>
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

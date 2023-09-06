import React from "react";
import CardItem from "./CardItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
const ContentCard = ({contents}) => {
  return (
    // <div className='container mt-4'>
    // <Row className="g-4 px-4 mx-auto" style={{justifyContent:"left"}}>
    //   {Array.from({ length: 10 }).map((_, idx) => (
    //     <Col key={idx}>
    //       <CardItem/>
    //       </Col>))}
    // </Row>
    // </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      // paddingLeft:'85px',
      // paddingRight:'100px'
    }}>
    <div className="container m-4" >
      <div
        className="row row-cols-1 row-cols-md-2
                    row-cols-lg-4 g-4"
      >
        {contents.folders.map((_, idx) => (
        <div className="col" key={idx} style={{display:"flex",justifyContent:"center"}}>
          <CardItem fName={_} isFolder={true}/>
          </div>))}
          {contents.files.map((_, idx) => (
        <div className="col" key={idx}  style={{display:"flex",justifyContent:"center"}}>
          <CardItem fName={_} isFolder={false}/>
          </div>))}
      </div>
    </div>
    </div>
  );
};

export default ContentCard;

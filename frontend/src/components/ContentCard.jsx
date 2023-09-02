import React from "react";
import CardItem from "./CardItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
const ContentCard = () => {
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
      paddingLeft:'100px'
    }}>
    <div class="container m-4" >
      <div
        class="row row-cols-1 row-cols-md-2
                    row-cols-lg-5 g-2"
      >
        {Array.from({ length: 10 }).map((_, idx) => (
        <div className="col" key={idx}>
          <CardItem/>
          </div>))}
      </div>
    </div>
    </div>
  );
};

export default ContentCard;

import React from 'react'
import Card from 'react-bootstrap/Card';

const CardItem = () => {
  return (
    <Card style={{ width: '10rem' }} bg='dark'>
        <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title style={{color:'white'}}>File name</Card.Title>
        <Card.Text style={{color:'white'}}>
                Size
                <br/>
                Modified
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardItem

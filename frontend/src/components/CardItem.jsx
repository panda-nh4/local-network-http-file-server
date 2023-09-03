import React from 'react'
import Card from 'react-bootstrap/Card';

const CardItem = () => {
  return (
    <Card style={{ width: '11rem',height:"18rem" }} bg='dark'>
        <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Card.Title style={{color:'white'}}>File name</Card.Title>
        <input type='checkbox' />
        </div>
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

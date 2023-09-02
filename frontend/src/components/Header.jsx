import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FiSearch} from 'react-icons/fi'
import {BsCodeSlash} from 'react-icons/bs'

const Header = () => {
  return (
    <>
        <Navbar key={false} expand={false} className="bg-dark mb-3" data-bs-theme="dark">
          <Container fluid>
          
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
            <Navbar.Offcanvas
              id='offcanvasNavbar-expand-false'
              aria-labelledby='offcanvasNavbarLabel-expand-false'
              data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body >
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <Nav.Link  href="#action1">Home</Nav.Link>
                  <Nav.Link  href="#action2">Other Locations</Nav.Link>

                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Navbar.Brand href="#" className='navbar-brand mx-auto '>Redo in MUI</Navbar.Brand>
            <Nav.Link className='text-white px-4' href="#action1"><FiSearch/></Nav.Link>
            <Nav.Link className='text-white px-4' href="#action1" ><BsCodeSlash/></Nav.Link>
          </Container>
        </Navbar>
    </>
  )
}

export default Header

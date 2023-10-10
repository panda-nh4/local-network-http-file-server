import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FiSearch } from "react-icons/fi";
import { BsCodeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../slices/locationsSlice";
import { setBasePath } from "../slices/pathSlice";
import { setIdle } from "../slices/contentSlice";
import { toggleFAB } from "../slices/selectedSlice";

const Header = () => {
  const [show, setShow] = useState(false);
  const locations = useSelector((state) => state.location.locations);
  const status = useSelector((state) => state.location.status);
  const basePath = useSelector((state) => state.path.basePath);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(getLocations());
    }
    if (basePath === "" && status==='success') {
      dispatch(setBasePath(locations[0]));
      dispatch(setIdle());
    }
  }, [status, locations]);
  const clicked = (base) => {
    dispatch(setBasePath(base));
    dispatch(setIdle());
    setShow(false);
    dispatch(toggleFAB(true))
  };
  return (
    <>
      <Navbar
        key={false}
        expand={false}
        className="bg-dark mb-3"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-false`}
            onClick={() => {setShow(true);dispatch(toggleFAB(false))}}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            data-bs-theme="dark"
            show={show}
          >
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                Locations
              </Offcanvas.Title>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => {setShow(false);dispatch(toggleFAB(true))}}
              ></button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 ">
                {locations.map((loc, idx) => {
                  return (
                    <Nav.Link onClick={() => clicked(loc)} key={idx}>
                      {loc}
                    </Nav.Link>
                  );
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand href="#" className="navbar-brand mx-auto ">
            Files
          </Navbar.Brand>
          <Nav.Link className="text-white px-4" href="#action1">
            <FiSearch />
          </Nav.Link>
          <Nav.Link className="text-white px-4" href="#action1">
            <BsCodeSlash />
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

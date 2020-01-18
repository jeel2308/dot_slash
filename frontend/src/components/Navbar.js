import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="navbar "
    >
      <Navbar.Brand>
        <Link to="/" className="navbar__link">
          Medi-Info
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav />
        <Nav className="mr-auto">
          <Nav.Link>
            <Link className="navbar__link" to="/doctor">
              Doctor
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="navbar__link" to="/patient">
              Patient
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="navbar__link" to="/hospital">
              Hospital
            </Link>
          </Nav.Link>
          {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
        {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

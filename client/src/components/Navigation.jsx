import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import SearchForm from './SearchForm';

function Navigation() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="border-bottom shadow-sm z-1 bg-light"
      sticky="top"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Nav.Link className="fs-2">e-shop</Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/">
              <Nav.Link
                to="/"
                className={pathname == '/' && 'border-bottom border-secondary'}
              >
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link
                to="/about"
                className={
                  pathname == '/about' && 'border-bottom border-secondary'
                }
              >
                About
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link
                to="/contact"
                className={
                  pathname == '/contact' && 'border-bottom border-secondary'
                }
              >
                Contact
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/men">
              <Nav.Link
                to="/men"
                className={
                  pathname == '/men' && 'border-bottom border-secondary'
                }
              >
                Men
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/women">
              <Nav.Link
                to="/women"
                className={
                  pathname == '/women' && 'border-bottom border-secondary'
                }
              >
                Women
              </Nav.Link>
            </LinkContainer>

            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">T-Shirt</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Shirt</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Lehenga Choli
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Kurta Pyjama
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Shoes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Clock</NavDropdown.Item>
            </NavDropdown>
            <SearchForm />
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Login</Nav.Link>
            <Nav.Link href="#deets">Register</Nav.Link>
            <LinkContainer to="/cart">
              <Nav.Link>
                <BsCartPlus />
                <span>(10)</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

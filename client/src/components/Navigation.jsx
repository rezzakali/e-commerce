import React from 'react';
import {
  Button,
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../features/auth/authSlice';
import { useGetCategoriesQuery } from '../features/category/categoryApi';
import styles from '../styles/Nav.module.css';
import SearchForm from './SearchForm';

function Navigation() {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: categories, isLoading } = useGetCategoriesQuery();

  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="z-1 bg-light" sticky="top">
      <Container fluid>
        <LinkContainer to="/">
          <Nav.Link className="fs-2">e-shop</Nav.Link>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={`${styles.navbar_toggler}`}
        />
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

            {!isLoading && (
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                {categories?.categories?.map((c) => (
                  <NavDropdown.Item href="#action/3.1" key={c._id}>
                    {c.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
            <SearchForm />
          </Nav>
          <Nav>
            {user ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle className="bg-light text-dark border-0">
                    {user?.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <LinkContainer
                      to={`/dashboard/${
                        user?.role === 'admin' ? 'admin' : 'user'
                      }`}
                    >
                      <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>

                    <Button
                      className="bg-body border-0 text-dark text-start"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Dropdown.Menu>
                </Dropdown>
                <LinkContainer to="/cart">
                  <Nav.Link to="/cart">
                    <BsCartPlus />
                    <span>(10)</span>
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <BsCartPlus />
                    <span>(0)</span>
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

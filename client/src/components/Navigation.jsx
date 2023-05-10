import React, { useEffect } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { BsHandbag } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../features/auth/authSlice';
import { getTotalAmount } from '../features/cart/cartSlice';
import { useGetCategoriesQuery } from '../features/category/categoryApi';
import styles from '../styles/Nav.module.css';
import SearchForm from './SearchForm';

function Navigation() {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch categories || API requesting
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotalAmount());
  }, [dispatch, cartItems]);

  // cart
  const { totalQuantity } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('auth');
    localStorage.removeItem('cartItems');
    navigate('/login');
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="z-1 bg-light border-bottom"
      sticky="top"
    >
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
                className={pathname == '/' && `${styles.nav_underline}`}
              >
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link
                to="/about"
                className={pathname == '/about' && `${styles.nav_underline}`}
              >
                About
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link
                to="/contact"
                className={pathname == '/contact' && `${styles.nav_underline}`}
              >
                Contact
              </Nav.Link>
            </LinkContainer>

            {!isLoading && (
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                {categories?.categories && (
                  <LinkContainer to="/categories/all-categories">
                    <NavDropdown.Item>All Categories</NavDropdown.Item>
                  </LinkContainer>
                )}
                {categories?.categories?.map((c) => (
                  <LinkContainer key={c._id} to={`/category/${c.slug}`}>
                    <NavDropdown.Item>{c.name}</NavDropdown.Item>
                  </LinkContainer>
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
                      to={`/${
                        user?.role === 'admin' ? 'dashboard/admin' : 'user'
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
                <LinkContainer to="/user/cart">
                  <Nav.Link to="/user/cart">
                    <BsHandbag />
                    <span>({totalQuantity})</span>
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

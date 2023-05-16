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
import { useMediaQuery } from 'react-responsive';
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

  const sm = useMediaQuery({ maxWidth: 991 });

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="z-1 bg-light border-bottom"
      sticky="top"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Nav.Link className="fs-1">e-Shop</Nav.Link>
        </LinkContainer>
        {sm && <SearchForm />}

        {sm && user && (
          <div className="ms-5 d-flex justify-content-end align-items-center">
            <Dropdown>
              <Dropdown.Toggle className="bg-light text-dark border-0">
                <img
                  src={`http://127.0.0.1:9000/api/v1/auth/get-user-profile-image/${user?._id}`}
                  alt="user_profile_image"
                  className="object-fit-cover rounded-circle border p-1"
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <LinkContainer
                  to={`/${user?.role === 'admin' ? 'dashboard/admin' : 'user'}`}
                  className="w-100 ms-2"
                >
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>

                <Button
                  className="bg-body border-0 text-dark text-start w-100"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Dropdown.Menu>
            </Dropdown>
            <LinkContainer to="/user/cart" className="me-2 mt-2">
              <Nav.Link to="/user/cart">
                <BsHandbag />
                <span>({totalQuantity})</span>
              </Nav.Link>
            </LinkContainer>
          </div>
        )}

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
            {!sm && <SearchForm />}
          </Nav>
          <Nav>
            {user ? (
              !sm && (
                <>
                  <Dropdown className="me-4">
                    <Dropdown.Toggle className="bg-light text-dark border-0">
                      <img
                        src={`http://127.0.0.1:9000/api/v1/auth/get-user-profile-image/${user._id}`}
                        alt="user_profile_image"
                        className="object-fit-cover rounded-circle border p-1"
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                        }}
                      />
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
                  <LinkContainer to="/user/cart" className="me-2 mt-2">
                    <Nav.Link to="/user/cart">
                      <BsHandbag />
                      <span>({totalQuantity})</span>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )
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

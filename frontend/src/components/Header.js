import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useLogout from '../hooks/useLogout';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logout = useLogout();

  return (
    <header>
      <Navbar className="navbar-dark bg-primary" expand="sm">
        <Container className="align-items-center flex-column flex-sm-row justify-content-sm-between">
          <LinkContainer className="align-self-start" to="/">
            <Navbar.Brand className="">Tech House</Navbar.Brand>
          </LinkContainer>

          <Nav
            className="flex-row  
          align-self-start
          justify-content-between
          justify-content-sm-end mt-2 mt-sm-0"
          >
            <LinkContainer to="/cart">
              <Nav.Link className="mr-4 mr-sm-0">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="mr-4 mr-sm-0">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

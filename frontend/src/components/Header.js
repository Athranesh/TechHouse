import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <header>
      <Navbar className="navbar-dark bg-primary " expand="sm">
        <Container className="align-items-center flex-column flex-sm-row justify-content-center justify-content-sm-between">
          <LinkContainer to="/">
            <Navbar.Brand className="mx-3 mx-sm-0">Tech House</Navbar.Brand>
          </LinkContainer>

          <Nav className="flex-row">
            <LinkContainer to="/cart">
              <Nav.Link className="px-2 px-sm-3">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="login">
              <Nav.Link className="px-2 px-sm-0">
                <i className="fas fa-user"></i> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

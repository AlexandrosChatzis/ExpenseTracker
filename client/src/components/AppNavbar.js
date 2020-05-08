import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };
  clearlocal = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/register">Register</NavLink>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Fragment>
    );
    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="/">Expenses Tracker</NavLink>
          <NavLink onClick={this.clearlocal} href="#">
            Logout
          </NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              <img
                style={{ height: "50px", width: "50px" }}
                src="logo192.png"
                alt="logo"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {localStorage.users ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;

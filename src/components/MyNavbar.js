import React, { useState, useContext, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../css/my-navbar.module.css";
import ShoppingCartModal from "./ShoppingCartModal";
import UserContext from "./UserContext";

function MyNavbar() {
  //state to show the shopping cart or not
  const [showCart, setShowCart] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  //Getting the user to display the email of who is signed in or not. state is used for the redering on screen. state is set to sessionStorage data.
  //The is an issue of on the first render, that user is null, so down in the component that uses user, there is a turnary operator that will reder whether a user exists or not
  const handleSignOut = () => {
    sessionStorage.setItem("user", JSON.stringify({ email: "", password: "" }));
    setUser(null);
    console.log(user);
  };

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")))
  },[setUser])

  return (
    <>
      <Navbar expand="lg" className={styles.headerColor}>
        <Container className={styles.navbarContainer}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className={styles.navItem}>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link className={styles.navItem} href="#about">
                <a href="/#about">About</a>
              </Nav.Link>
              <Nav.Link className={styles.navItem}>
                <Link to="/rent">Rent a dog</Link>
              </Nav.Link>
              <Nav.Link className={styles.navItem}>
                <Link to="/sale">Puppies for sale</Link>
              </Nav.Link>
              <Nav.Link className={styles.navItem}>
                <Link to="/contact">Contact</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className={styles.navbarRightLinks}>
            <Nav.Link
              className={`${styles.navItem} ${styles.navItemRight}`}
              href="#home"
            >
              {user === null ? (
                <Link to="/loginCustomer">Sign In</Link>
              ) : user.email === "" ? (
                <Link to="/loginCustomer">Sign In</Link>
              ) : (
                <Link to="/loginCustomer" onClick={handleSignOut}>
                  Sign out of {user.email}
                </Link>
              )}
            </Nav.Link>
            <Nav.Link
              onClick={handleShow}
              className={`${styles.navItem} ${styles.navItemRight}`}
            >
              Puppy Cart
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
      <ShoppingCartModal visible={showCart} closeCallback={handleClose} />
    </>
  );
}

export default MyNavbar;

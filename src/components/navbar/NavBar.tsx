import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavBar.css"

export default function NavBar() {
    const [isAdmin, setisAdmin] = useState(false); //will using redux store to get the roles
    const [isLoggedIn, setisLoggedIn] = useState(false); //will using redux store to get the logged in status
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/">LogoGoes here</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#/">Home</Nav.Link>
                            <Nav.Link href="#/products" >Product</Nav.Link>
                            <Nav.Link href="#/about">About</Nav.Link>
                            <Nav.Link href="#/cart">Cart</Nav.Link>
                            {isLoggedIn ? <NavDropdown title="Profile" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#account">Account</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Your Orders
                                </NavDropdown.Item>{
                                    isAdmin ? <NavDropdown.Item href="#admin">
                                        Admin Dashboard
                                    </NavDropdown.Item> : ""
                                } <NavDropdown.Divider />
                                <NavDropdown.Item href="#logout">
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown> : <Nav.Link href="#/login">Login/Signup</Nav.Link>}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, selectUser, updateUser } from '../../slice/userSlice';
import { selectTotalItems } from '../../slice/cartSlice';
import { configureAxios } from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { initialState } from '../../types/userTypes';

export default function NavBar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [items, setItems] = useState(0);

    const user = useSelector(selectUser);
    const totalItems = useSelector(selectTotalItems);
    const dispatch = useDispatch();
   
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const user = JSON.parse(sessionStorage.getItem('user')!);
            console.log(user);
            dispatch(updateUser(user));
            setIsLoggedIn(true);

            const timeoutId = setTimeout(() => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                dispatch(updateUser(initialState)); // Clear user in redux state if needed
            }, 20 * 60 * 1000); // 5 minutes in milliseconds

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timeoutId);
        }
    }, [token, dispatch]); // Depend only on token and dispatch

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (user && user.email && user.email.trim() !== '') {
            setIsLoggedIn(true);

            const adminRole = user.roles?.some(role => role === "ADMIN");
            setIsAdmin(adminRole || false);
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, [user]);


    useEffect(()=>{
        setItems(totalItems);
    },[totalItems])

    const logout = () => {
        dispatch(resetUser());
        sessionStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(() => {
        configureAxios(); //setting the configuration for axios with jwt token
      }, [token]);


    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary fixed-top navbar-container">
                <Container fluid>
                    <Navbar.Brand href="/">LogoGoes here</Navbar.Brand>
                    <button data-quantity={items} className="btn-cart custom-btn-cart">
                                <svg className="icon-cart" viewBox="0 0 24.38 30.52" height="30.52" width="24.38" xmlns="http://www.w3.org/2000/svg">
                                    <title>icon-cart</title>
                                    <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"></path>
                                </svg>
                           
                            </button>
                    <Navbar.Toggle  />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="navbar-custom"
                            // style={{ maxHeight: '100px' }}
                            // navbarScroll
                        >
                            <Nav.Link href="#/">Home</Nav.Link>
                            <Nav.Link href="#/products" >Product</Nav.Link>
                            <Nav.Link href="#/about">About</Nav.Link>
                            <Nav.Link href="#/cart">Cart</Nav.Link>
                            {isLoggedIn ? <NavDropdown title="Profile" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#/account">Account</NavDropdown.Item>
                                <NavDropdown.Item href="#/orders">
                                    Your Orders
                                </NavDropdown.Item>{
                                    isAdmin ? <NavDropdown.Item href="#admin">
                                        Admin Dashboard
                                    </NavDropdown.Item> : ""
                                } <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>
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

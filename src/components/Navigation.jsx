import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';

const Navigation = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar collapseOnSelect sticky="top" variant="light" bg="light" expand="md">
                <Container fluid>
                    <Navbar.Brand to="/" as={Link}>Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                                <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                                <Nav.Link onClick={logout} to="/">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Container>
            </Navbar>

            <CartSidebar show={show} handleClose={handleClose} />
        </>
    );
};

export default Navigation;
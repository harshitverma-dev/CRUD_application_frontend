import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid="lg">
                <Navbar.Brand href="#home">CRUD Application </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header
import React from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './barra.css';


export default class Barra extends React.Component {


    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" >
                    <Container>
                        <Navbar.Brand><Link className={"link"} to={'/'}>BookYourBusiness</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">

                                <NavDropdown  title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="action3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="action3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="action3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="action3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link ><Link className={"link"} to={'/services'}> Services </Link></Nav.Link>
                                <Nav.Link><Link className={"link"} to={'/pricing'}> Pricing </Link></Nav.Link>
                                <Nav.Link ><Link className={"link"} to={'/whyUs'}>Why Us? </Link></Nav.Link>
                                <Nav.Link ><Link className={"link"} to={'/workWithUs'}>Work with Us </Link></Nav.Link>
                                <Nav.Link ><Link className={"link"} to={'/signUp'}>Sign Up </Link></Nav.Link>
                                <Nav.Link><Link className={"link"} to={'/logIn'}>Log in </Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}


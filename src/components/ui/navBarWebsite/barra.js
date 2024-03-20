import React from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './barra.css';
import {FormattedMessage} from 'react-intl';


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
                                    <NavDropdown.Item href="action3.1"><FormattedMessage id="barra.action2"/></NavDropdown.Item>
                                    <NavDropdown.Item href="action3.2">
                                        <FormattedMessage id="barra.action"/>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="action3.3"><FormattedMessage id="barra.action3"/></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="action3.4">
                                        <FormattedMessage id="barra.action4"/>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link ><Link className={"link"} to={'/services'}> <FormattedMessage id="barra.services"/> </Link></Nav.Link>
                                <Nav.Link><Link className={"link"} to={'/pricing'}> <FormattedMessage id="barra.pricing"/> </Link></Nav.Link>
                                <Nav.Link ><Link className={"link"} to={'/whyUs'}><FormattedMessage id="barra.why"/> </Link></Nav.Link>
                                <Nav.Link ><Link className={"link"} to={'/workWithUs'}><FormattedMessage id="barra.work"/> </Link></Nav.Link>
                                <Nav.Link ><Link className={"link"} to={'/signUp'}><FormattedMessage id="barra.signup"/> </Link></Nav.Link>
                                <Nav.Link><Link className={"link"} to={'/logIn'}><FormattedMessage id="barra.login"/> </Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}




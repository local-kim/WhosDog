import React  from 'react'
import {
    Link
  } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';

const NavBarLogout = () => {


    return (
    <div className="header">
        <Navbar className="justify-content-center nav-menu">
            <Nav className="maxWidth">
                <Nav.Link><Link to="/login" className="font-white col-6">Login</Link></Nav.Link>
                <Nav.Link><Link to="/Register" className="font-white col-6">Register</Link></Nav.Link>
            </Nav>
        </Navbar>
      
    </div>
    )
};

export default NavBarLogout

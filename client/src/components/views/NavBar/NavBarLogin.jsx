import React, { useState, useCallback } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    withRouter
  } from "react-router-dom";
import { Nav, Navbar, NavDropdown, } from 'react-bootstrap';

const NavBarLogin = (props) => {
    const userGreeting = useCallback(() => {
        const onLogoutHandler = (event)=>{
            console.log("tt");
            event.preventDefault();
            axios.get('/api/auth/logout')
            .then(response => {
                console.log(response);
                if(response.data.success){
                    sessionStorage.removeItem('userid');
                    window.location.href = 'http://localhost:3000/login';
                } else {
                    alert('로그아웃 실패');
                }
            })
        };
        return ( 
            <div className="dropup">
                <NavDropdown.Item href="/myInfo">Info</NavDropdown.Item>
                <NavDropdown.Item href="/Logout" onClick={onLogoutHandler}>Logout</NavDropdown.Item>                         
            </div>
        )
    });
  
    const [UserGreeting, setUserGreeting]= useState(userGreeting);
 
    return (
    <>    
    <div className="header">
        <Navbar className="justify-content-center nav-menu">
            <Nav className="maxWidth">
                <Nav.Link className="pl-0 pr-0"><Link to="/Search" className="font-white col-3"><span className="navlist">SEARCH</span></Link></Nav.Link>
                <Nav.Link className="pl-0 pr-0"><Link to="/Community" className="font-white col-3 pl-sm-0"><span className="navlist">BOARD</span></Link></Nav.Link>
                <Nav.Link className="pl-0 pr-0"><Link to="/Review" className="font-white col-3 pl-sm-0"><span className="navlist">REVIEW</span></Link></Nav.Link>
                <NavDropdown drop="up" align="start" title="ACCOUNT" className="font-white col-3 pl-0 pr-0" id="basic-nav-dropdown" style={{"color":"white"}}>
                { UserGreeting }
                </NavDropdown>
            </Nav>
        </Navbar>   
    </div>
    </>
    )
};

export default withRouter(NavBarLogin);
import React from 'react';
import NavBarLogin from '../NavBar/NavBarLogin';

const LandingPage = () => {
    console.log("1234");
    return (
        <>
        <NavBarLogin />
        <div className="mainImage">
            <img src={'/Images/whosdog_landing.png'} style={{width:"100%"}} alt={"Main page"}/>
        </div>
        </>
    )
}

export default LandingPage
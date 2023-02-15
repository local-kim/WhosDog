import React, { useState, useRef, useEffect } from 'react';
import { useDispatch  } from 'react-redux';
import { loginUser, setLocation } from '../../../_action/user_action';
import { useHistory, withRouter } from "react-router-dom";
import Header from '../NavBar/Header';

const LoginPage = ( ) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const latitude = useRef(null);
    const longitude = useRef(null);
    const history = useHistory();
    
    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 페이지가 refresh 되지 않게 해준다

        let body = {
            email: email,
            password : password,
            latitude: latitude.current,
            longitude: longitude.current,  
        }
        
        dispatch(loginUser(body))
        .then((response) => {
            if(response.payload.loginSuccess){
                window.location.href = 'http://localhost:3000/';
            } else {
                alert(response.payload.message);
            };
        });
    }

    const onJoinHandler = () =>{
        history.push('/register');
    }

    const success = ( position ) => {
        latitude.current = position.coords.latitude;
        longitude.current = position.coords.longitude;
    }

    const error = () => {
        let location = {
            latitude: latitude.current,
            longitude: longitude.current,    
        }
        dispatch(setLocation(location));
    }

    const locationSet = () => {
        if(!navigator.geolocation) {
                
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    useEffect(() => {
        locationSet();
    }, []);

    return (
        <>
        <Header/>
        <div className="container-custom">
        <div className="card-custom" style={{"max-width":"370px"}}>
            <form onSubmit={onSubmitHandler}>
                <h3>Login</h3>
                <div className="inputgroup">
                    <input name="email" type="email" value={email} placeholder="Enter email" onChange={onEmailHandler} />
                </div>
                <div className="inputgroup mb-3">
                    <input name="password" type="password" value={password} placeholder="Password" onChange={onPasswordHandler} />
                </div>
                <button type="submit" className="loginBtn w-100 mb-1">
                    Login
                </button>
                <button onClick={onJoinHandler} className="loginBtn w-100">
                    Join
                </button>
            </form>
        </div>
        </div>
        </>
    )
}

export default withRouter(LoginPage)
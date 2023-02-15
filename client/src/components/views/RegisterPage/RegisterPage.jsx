import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_action/user_action';
import { useHistory,withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Header from '../NavBar/Header';


const RegisterPage = (props) => {
    const dispatch = useDispatch();

    const history = useHistory();
    const [Email, setEmail] = useState("");
    const [Nickname, setNickname] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value);
    }
    
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onLoginHandler=() =>{
        history.push('/login');
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 페이지가 refresh 되지 않게 해준다
        if(Password !== ConfirmPassword){
            return alert('check your password!');
        }
        
        let body = {
            email: Email,
            nick: Nickname,
            password : Password,
        }
        if(Email!==''&&Nickname!==''&&Password!==''){
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login");
                } else {
                    alert(response.payload.message);
                }
            });
        }else{
            alert('정보를 입력하세요');
        }
    }

    return (
        <>
        <Header/>
        <div className="container-custom">
            <div className="card-custom" style={{"max-width":"370px"}}>
                <form onSubmit={onSubmitHandler} >
                    <h3>Join</h3>
                    <div className="join pl-1">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control type="email" value={Email} placeholder="Enter email" onChange={onEmailHandler} />
                    </Form.Group>
                    <Form.Group controlId="formBasicNickName">
                        <Form.Label>NickName</Form.Label>
                        <Form.Control type="text" value={Nickname} placeholder="Enter nickname" onChange={onNicknameHandler} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={Password} placeholder="Enter password" onChange={onPasswordHandler} />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={ConfirmPassword} placeholder="Enter password" onChange={onConfirmPasswordHandler} />
                    </Form.Group>
                    <button type="submit" className="loginBtn w-100 mb-1">
                        Join
                    </button>
                    <button onClick={onLoginHandler} className="loginBtn w-100">
                        Cancel
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default withRouter(RegisterPage)

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userInfo, updateUserInfo } from '../../../_action/user_action';
import { Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import NavBarLogin from '../NavBar/NavBarLogin';
import Header from '../NavBar/Header';

const InfoPage = () => {
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // 페이지 로딩되면 서버에서 닉네임 가져오기. 
    // 나중에 시간되면 중복확인도 추가하면 좋을거 같음
    const onNicknameHandler = (event) =>{
        setNickname(event.currentTarget.value);
    }
    
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value);
    }

    useEffect(() => {
        dispatch(userInfo())
        .then(response => {
            if(response.payload){
                console.log(response);
                setNickname(response.payload.nickname);
            }
        });
    }, []);

    const onSubmitHandler = (event) => {
        if(password !== confirmPassword){
            return alert('check your password!');
        }
        let body = {
            nick: nickname,
            password : password,
        }

        dispatch(updateUserInfo(body))
        .then(response => {
            if(response.payload.success){
                alert("변경이 완료되었습니다.");
            }
        });
    }

    return (
        <>
        <Header/>
        <NavBarLogin/>
        <div className="container-custom">
            <div className="card-custom" style={{"max-width":"370px"}}>
                <form onSubmit={onSubmitHandler}>
                    <h3>My Info</h3>
                    <div className="join">
                    <Form.Group>
                        <Form.Label>NickName</Form.Label>
                        <Form.Control type="text" value={nickname} placeholder={nickname} onChange={onNicknameHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={onPasswordHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={confirmPassword} placeholder="ConfirmPassword" onChange={onConfirmPasswordHandler} />
                    </Form.Group>
                    <button type="submit" className="loginBtn w-100">
                        Save
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default withRouter(InfoPage);

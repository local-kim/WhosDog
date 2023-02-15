import axios from 'axios';
import { 
    LOGIN_USER, 
    REGISTER_USER,
    LOGOUT_USER,
    USER_INFO,
    UPDATE_USER_INFO,
    SET_LOCATION,
    SET_USER
} from './types';


export const loginUser = (dataToSubmit) => {
    const request = axios.post('/api/auth/login', dataToSubmit)
    .then(response => ( response.data));
    
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const registerUser = (dataToSubmit) => {
            
    const request = axios.post('/api/auth/join', dataToSubmit)
    .then(response => ( response.data ));

    return {
        type: REGISTER_USER,
        payload: request
    }

}

export const logoutUser = () => {

    const request = axios.get('/api/auth/logout')
    .then(response => ( response.data ));

    return {
        type: LOGOUT_USER,
        payload: request
    }

}

export const userInfo = () => {

    const request = axios.get('/api/auth/userinfo')
    .then(response => (response.data));

    return {
        type: USER_INFO,
        payload: request
    }
}

export const updateUserInfo = (dataToSubmit) => {

    const request = axios.post('/api/auth/updateuserinfo', dataToSubmit)
    .then(response => (response.data));

    return {
        type: UPDATE_USER_INFO,
        payload: request
    }
}

export const setLocation = (dataTosubmit) => {
    
    const request = axios.post('/api/auth/setlocation', dataTosubmit)
    .then(response => (response.data));

    return {
        type: SET_LOCATION,
        payload: request,
    }
}

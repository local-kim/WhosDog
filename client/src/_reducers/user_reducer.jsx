import {
    LOGIN_USER, 
    REGISTER_USER,
    LOGOUT_USER,
    USER_INFO,
    UPDATE_USER_INFO,
    SET_LOCATION,
    SET_USER
} from '../_action/types';

const userReducer = (state = {
    location: {
        latitude: null,
        longitude: null,
    }
}, action) => {
    switch (action.type) {
        case LOGIN_USER: 
            return { ...state, loginSuccess: action.payload,};

        case REGISTER_USER: 
            return { ...state, register: action.payload };

        case LOGOUT_USER:
            return { ...state, success: action.payload };

        case USER_INFO:
            return { ...state, 
                success: action.payload 
            };

        case UPDATE_USER_INFO:
            return { ...state, suceess: action.payload };

        case SET_LOCATION:
            return { ...state, 
                success: action.payload
            };
    
        default:
            return state;
    }
}

export default userReducer;
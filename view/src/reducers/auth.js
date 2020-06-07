import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACC_DELETED
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isRegistered: null,
    isAuthenticated: null,
    loading: true,
    user: null,
    userdate: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isRegistered: true,
                isAuthenticated: true,
                loading: false,
                user: payload,
                userdate: payload.date
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isRegistered: true,
                isAuthenticated: false,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isRegistered: true,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACC_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isRegistered: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                userdate: null
            }
        default: 
            return state;
    }
}
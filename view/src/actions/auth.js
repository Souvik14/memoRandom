import axios from 'axios';
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACC_DELETED,
    CLEAR_TODOS
} from './types';
import setAuthToken from '../util/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'normal', 'error')));
        }

        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch(setAlert('Welcome! Please Login to continue', 'fixed', 'light', 4000));

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors && errors.length == 1) { 
            dispatch(setAlert(errors[0].msg, 'fixed', 'error', 4000)); 
        } else if (errors && errors.length > 1) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'normal', 'error')));
            dispatch(setAlert('Fill out the form', 'fixed', 'error', 4000));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}


// Login User
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/users/auth', body, config);

        dispatch(setAlert('Logging in...', 'fixed', 'dark', 1000));

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'normal', 'error' )));
            dispatch(setAlert('Invalid Creds', 'fixed', 'error', 4000));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}

// Delete user account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete('/api/users/delete');
  
        dispatch({ type: CLEAR_TODOS });
        dispatch({ type: ACC_DELETED });
  
        dispatch(setAlert('Account deleted. Come back soon', 'fixed', 'dark'));
      } catch (err) {
        
        dispatch({
          type: AUTH_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };
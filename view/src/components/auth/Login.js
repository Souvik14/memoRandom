import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, isRegistered, setAlert }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(email === '' && password === '') {
            setAlert('Use Creds to Login', 'fixed', 'error', 4000);
        } else if (email === '') {
            setAlert('Email is required', 'fixed', 'error', 4000);
        } else if (password === '') {
            setAlert('Password is required', 'fixed', 'error', 4000);
        } else {
            login({ email, password });
        }
    }

    if (isAuthenticated) {
        return <Fragment><Redirect to="/todos" /></Fragment>;
    }

    return (
        <div className="auth-container">
            <div className="login-signup-area">
            <h1 className="large">
                Log In
            </h1>
            <p className="lead lead-form-sub-header">Sign into your account <i className="fas fa-sign-in-alt"></i></p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Registered email"
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength="6" 
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input 
                    type="submit"
                    value="Login"
                    className="btn btn-form" 
                />
            </form>
            {!isRegistered && <p className="lead lead-form-sub-header">Don't have an account? <Link to="/register" className="link link-light"><span className="ask">Sign up for free</span></Link></p>}
            </div>
            <div className="info-area hide-sm">
                <h1 className="large-info-header">
                <i class="fas fa-thumbtack"></i> Perks of joining us
                </h1>
                <div className="perk-info">
                    <p className="lead-index-info"><i class="fas fa-genderless"></i> Add, Edit and Modify from anywhere, 24x7</p>
                    <p className="lead-index-info"><i class="fas fa-genderless"></i> Fast, Secure & Dependable WebApp</p>
                    <p className="lead-index-info"><i class="fas fa-genderless"></i> User Friendly Interface</p>
                    <p className="lead-index-info"><i class="fas fa-genderless"></i> Mobile device Friendly</p>
                    <p className="lead-index-info"><i class="fas fa-genderless"></i> Compatible with all modern Browsers</p>
                </div>
                <Link to="/about" className="link link-light">Know more</Link>
            </div>
        </div>
        
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isRegistered: state.auth.isRegistered,
});

export default connect(mapStateToProps, { login,setAlert })(Login);
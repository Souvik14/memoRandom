import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';


const Register = ({ setAlert, register, isRegistered }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (name === '') {
            setAlert('Name is required', 'fixed', 'error', 4000);
        } else if (email === '') {
            setAlert('Email is required', 'fixed', 'error', 4000);
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'fixed', 'error', 4000);
        } else if (password.length < 6 || password2.length <6) {
            setAlert('Lenthen Password', 'fixed', 'error', 4000);
        } else {
            register({ name, email, password });
        }
    }

    const letterNumber = /^[0-9a-zA-Z]+$/;
    const symbols = /[$-/:-?@#{-~!"^_`\[\]]/;

    if (isRegistered === true) {
        return <Fragment><Redirect to="/login" /></Fragment>;
    }

    

    return (
        <div className="auth-container">
            <div className="login-signup-area">
            <h1 className="large">
                Sign Up
            </h1>
            <p className="lead lead-form-sub-header">Create your account <i className="fas fa-user-plus"></i></p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text"
                        name="name" 
                        placeholder="Full name"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">Use your gravatar email if you want a profile picture</small>
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password" 
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    { password === '' && <small className="form-text">Minimum 6 letters. Use of Alphabets, Digits & Symbols is recommended</small> }
                    { password.length <= 6 && password.length >= 1 && ( password.match(letterNumber) || password.match(symbols) ) && <small style={{color: '#dc3545'}} className="form-text"><i className="far fa-frown"></i> Weak (Min. 6 letters)</small> }
                    { password.length > 6 && password.length <= 12 && ( password.match(letterNumber) || password.match(symbols) ) && <small style={{color: '#feb300'}} className="form-text"><i className="far fa-meh"></i> Average</small> }
                    { password.length > 12 && ( password.match(letterNumber) || password.match(symbols) ) && <small style={{color: '#28a745'}} className="form-text"><i className="far fa-smile"></i> Strong</small> }
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        name="password2"
                        placeholder="Confirm password"
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                    { password.length >= 6 && password2.length >= 6 && password2 === password && <small style={{color: '#28a745'}} className="form-text"><i className="fas fa-check-circle"></i> Match</small>}
                </div>
                <input 
                    type="submit"
                    value="Join"
                    className="btn btn-form" 
                />
            </form>
            <p className="lead lead-form-sub-header">Already have an account? <Link to="/login" className="link link-light"><span className="ask">Log in here</span></Link></p>
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

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isRegistered: PropTypes.bool
}

const mapStateToProps = state => ({ 
    isRegistered: state.auth.isRegistered
 });


export default connect(mapStateToProps, { setAlert, register })(Register);

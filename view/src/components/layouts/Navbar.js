import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        
        <ul>
            <li>
                {user && user.name && 
                    <Link to='/user'>
                        <i className="fas fa-user-circle"></i><span className="hide-sm">  {user.name}</span>
                    </Link>}
            </li>
            <li>
                <Link to='/todos'><i className="fas fa-clipboard-list"></i><span className="hide-sm"> Todos</span></Link>
            </li>
            <li>
                <Link to='/archive'><i className="fas fa-archive"></i><span className="hide-sm"> Archive</span></Link>
            </li>
            <li>
                <Link onClick={logout}><i className="fas fa-sign-out-alt"></i><span className="hide-sm"> Logout</span></Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/about'><i className="fas fa-info-circle"></i><span className="hide-sm"> About</span></Link>
            </li>
            <li>
                <Link to='/login'><i className="fas fa-sign-in-alt"></i><span className="hide-sm"> Login</span></Link>
            </li>
            <li>
                <Link to='/register'><i className="fas fa-user-plus"></i><span className="hide-sm"> Sign Up</span></Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>    
                <Link to='/'>
                    <i className="fas fa-list-alt"></i>{' '}
                     m<span className="hide-sm">emo</span>R<span className="hide-sm">andom</span>
                </Link>
            </h1>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

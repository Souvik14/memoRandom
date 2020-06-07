import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../actions/auth';
import { deleteAllTodos } from '../../actions/todo';


const User = ({
    deleteAllTodos,
    deleteAccount,
    auth: {user, userdate}
}) => {
    return (
        <div className="user-container">
            <Link to="/todos"><i className="far fa-arrow-alt-circle-left"></i> Go back to All Todo Cards</Link>
            <div className="user">
                <div className="user-line-1">
                    <div>
                        <img className="sq-img" src={user && user.profilePic} alt='' />
                    </div>
                    <div>
                        <h1 className="user-name">{user && user.name}</h1>
                        <p className="user-info">{user && user.email}</p>
                        <p className="user-info">Using memoRandom since {moment(userdate).calendar({
                            sameDay: '[Today]',
                            nextDay: '[Tomorrow]',
                            nextWeek: 'dddd',
                            lastDay: '[Yesterday]',
                            lastWeek: '[Last] dddd',
                            sameElse: 'D MMM YYYY'
                        })}</p>
                        <p className="user-info" style={{ fontSize: "0.8rem"}}><i className="fas fa-cog"></i> Use <a href={"https://gravatar.com/"} target='_blank' rel='noopener noreferrer'>Gravatar</a> to set or update your Profile Picture</p>
                    </div>
                </div>
                <div className="user-line-2">
                    <h2><button className="user-btn" onClick={() => deleteAllTodos()}>Clear All Todos <i className="far fa-window-close"></i></button></h2>
                    <h2><button className="user-btn" onClick={() => deleteAccount()}>Delete account <i className="fas fa-user-minus"></i></button></h2>
                </div>
            </div>
        </div>
    )
}

User.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteAccount, deleteAllTodos })(User);
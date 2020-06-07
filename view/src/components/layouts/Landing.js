import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth: { isAuthenticated, loading } }) => {
    const authButton = (
        <div className="landing-btns">
            <div className="button">
                <Link to="/todos" className="btn btn-index">Back to Todos</Link>
            </div>
            <div className="button">
                <Link to="/about" className="btn btn-index">Know more</Link>
            </div>
        </div>
    );

    const guestButton = (
        <div className="landing-btns">
            <div className="button">
                <Link to="/login" className="btn btn-index">Get started</Link>
            </div>
            <div className="button">
                <Link to="/about" className="btn btn-index">Know more</Link>
            </div>
        </div>  
    );

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="large-font-light land-less-header">memoRandom</h1>
                    <div className="dictionary">
                        <p className="lead-font-light-ita">noun</p>
                        <p className="lead-font-light">Origin: memorandum (Latin)</p>
                        <p className="lead-font-light">A written message that may be used in a business office</p>
                    </div>
                    <p className="lead-index land-less-sub-header">Your daily Todo and Reminder app </p>
                    { !loading && (<Fragment>{ isAuthenticated ? authButton : guestButton }</Fragment>) }
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect( mapStateToProps )(Landing);
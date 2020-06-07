import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pulse from '../../layouts/Pulse';
import TodoItem from '../TodoItem';
import { searchByInProgress } from '../../../actions/todo';

const TodoInProgress = ({
    searchByInProgress,
    todo: { todos, loading, hasChanged }
}) => {
    useEffect(() => {
        searchByInProgress();
    }, [searchByInProgress]);

    return loading ? <Pulse /> : (
    <Fragment>
        <div className="card-container">
            <Link to="/todos"><i className="far fa-arrow-alt-circle-left"></i> Go back to All Todo Cards</Link>
            {hasChanged === false ? (
                <h2 className="comp-header">
                    No Todo Cards are In Progress
                </h2>
            ) : (
                <Fragment>
                    <h2 className="comp-header">
                        Todo Cards that are <i className="fas fa-tasks"></i> In Progress
                    </h2>
                    <div className="cards">
                        {
                            todos.map(todo => (
                                <TodoItem key={todo._id} todo={todo} />
                            ))
                        }
                    </div>
                </Fragment>
            )}
        </div>
    </Fragment>)
}

TodoInProgress.propTypes = {
    todo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
});

export default connect( mapStateToProps, { searchByInProgress })(TodoInProgress);
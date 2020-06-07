import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pulse from '../layouts/Pulse';
import TodoItem from './TodoItem';
import { getArchivedTodos } from '../../actions/todo';

const TodoArchive = ({
    getArchivedTodos, 
    todo: { todos, loading, hasChanged } 
}) => {
    useEffect(() => {
        getArchivedTodos();
    });

    return loading ? <Pulse /> : (
        <Fragment>
            <div className="card-container">
                <Link to="/todos"><i className="far fa-arrow-alt-circle-left"></i> Go back to All Todo Cards</Link>
                {hasChanged === false ? (
                    <h2 className="comp-header">No Archived Todo Cards</h2>
                ) : (
                    <Fragment>
                        <h2 className="comp-header">
                            Archived Todo Cards
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

TodoArchive.propTypes = {
    getArchivedTodos: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
})

export default connect(mapStateToProps, { getArchivedTodos })(TodoArchive);

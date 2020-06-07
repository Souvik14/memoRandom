import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pulse from '../../layouts/Pulse';
import TodoItem from '../TodoItem';
import { searchByWork } from '../../../actions/todo';

const TodoWork = ({
    searchByWork,
    todo: { todos, loading, hasChanged }
}) => {
    useEffect(() => {
        searchByWork();
    }, [searchByWork]);

    return loading ? <Pulse /> : (
    <Fragment>
        <div className="card-container">
            <Link to="/todos"><i className="far fa-arrow-alt-circle-left"></i> Go back to All Todo Cards</Link>
            {hasChanged === false ? (
                <h2 className="comp-header">
                    No Todo Cards under Work label yet
                </h2>
                ) : (
                <Fragment>
                    <h2 className="comp-header">
                    Todo Cards that are labelled <i className="fas fa-briefcase"></i> Work
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

TodoWork.propTypes = {
    todo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
});

export default connect( mapStateToProps, { searchByWork })(TodoWork);


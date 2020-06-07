import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pulse from '../../layouts/Pulse';
import TodoItem from '../TodoItem';
import { searchByShopping } from '../../../actions/todo';

const TodoShopping = ({
    searchByShopping,
    todo: { todos, loading, hasChanged },
}) => {
    useEffect(() => {
        searchByShopping();
    }, [searchByShopping]);

    return loading ? <Pulse /> : (
    <Fragment>
        <div className="card-container">
            <Link to="/todos"><i className="far fa-arrow-alt-circle-left"></i> Go back to All Todo Cards</Link>
            {hasChanged === false ? (
                <h2 className="comp-header">
                    No Todo Cards under Shopping label yet
                </h2>
            ) : (
                <Fragment>
                    <h2 className="comp-header">
                        Todo Cards that are labelled <i className="fas fa-shopping-cart"></i> Shopping
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

TodoShopping.propTypes = {
    todo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
});

export default connect( mapStateToProps, { searchByShopping })(TodoShopping);
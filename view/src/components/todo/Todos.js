import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pulse from '../layouts/Pulse';
import TodoItem from './TodoItem';
import { getTodos } from '../../actions/todo';
import TodoForm from './TodoForm';
import TodoSearchBox from './TodoSearchBox';

const Todos = ({
    getTodos,
    todo: { todo, todos, loading, hasChanged } 
}) => {
    useEffect(() => {
        getTodos();
    }, todo);

    return loading ? <Pulse /> : (
        <Fragment>
            <div className="card-container">
                <TodoForm />
                <TodoSearchBox />
                {hasChanged === false ? (
                    <h2 className="comp-header">Your Todo Cards will appear here <i className="far fa-arrow-alt-circle-down"></i></h2>
                ) : (
                    <div className="cards">
                        { 
                            todos.map(todo => (
                                <TodoItem key={todo._id} todo={todo} />
                            ))
                        }
                    </div>
                )}
            </div>
        </Fragment>)

}

Todos.propTypes = {
    getTodos: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
});

export default connect(mapStateToProps, { getTodos })(Todos);

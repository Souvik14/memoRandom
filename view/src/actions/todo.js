import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_TODOS,
    TODO_ERROR,
    DELETE_TODO,
    UPDATE_ARCHIVE,
    UPDATE_STATUS,
    ADD_TODO,
    SEARCH_RESULT,
    GET_ARCHIVED_TODOS,
    EDIT_TODO,
    CLEAR_TODOS
} from './types';

// Get all todos
export const getTodos = () => async dispatch => {
    try {
        const res = await axios.get('/api/todos');

        dispatch({
            type: GET_TODOS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Archive todo
export const archiveTodo = id => async dispatch => {
    try {
        const res = await axios.put(`/api/todos/archive/${id}`);

        dispatch(setAlert('Archive updated', 'fixed', 'success', 3000));

        dispatch({
            type: UPDATE_ARCHIVE,
            payload: { id, isArchived: res.data }
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get archived todos
export const getArchivedTodos = () => async dispatch => {
    try {
        const res = await axios.get('/api/todos/archive');

        dispatch({
            type: GET_ARCHIVED_TODOS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete todo
export const deleteTodo = id => async dispatch => {
    try {
        await axios.delete(`/api/todos/${id}`);

        dispatch(setAlert('Todo Card deleted', 'fixed', 'success', 3000));

        dispatch({
            type: DELETE_TODO,
            payload: id
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Edit todo
export const editTodo = (id,formData,history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/todos/${id}`, formData, config);

        dispatch(setAlert('Todo Card updated', 'fixed', 'success', 3000));

        dispatch({
            type: EDIT_TODO,
            payload: res.data
        });

        history.push('/todos');
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'fixed', 'error' )));
        }

        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}



// Update status
export const updateStatus = ( _id, type ) => async dispatch => {
    try {
        const res = await axios.put(`/api/todos/status/${type}/${_id}`);

        dispatch({
            type: UPDATE_STATUS,
            payload: { _id, status: res.data }
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add todo
export const addTodo = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/todos', formData, config);

        dispatch({
            type: ADD_TODO,
            payload: res.data
        });

        dispatch(setAlert('Todo Card added', 'fixed', 'success'));
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'fixed', 'error' )));
        }

        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Search by label: personal
export const searchByPersonal = () => async dispatch => {
    try {
        const res = await axios.get('api/todos/label/personal');

        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Search by label: work
export const searchByWork = () => async dispatch => {
    try {
        const res = await axios.get('api/todos/label/work');

        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Search by label: shopping
export const searchByShopping = () => async dispatch => {
    try {
        const res = await axios.get(`/api/todos/label/shopping`);
        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Search by label: others
export const searchByOthers = () => async dispatch => {
    try {
        const res = await axios.get('api/todos/label/others');

        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Search by status: new
export const searchByNew = () => async dispatch => {
    try {
        const res = await axios.get('api/todos/status/newItem');

        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Search by status: in progress
export const searchByInProgress = () => async dispatch => {
    try {
        const res = await axios.get('api/todos/status/inProgress');

        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Search by status: new
export const searchByCompleted = () => async dispatch => {
    try {
        const res = await axios.get('api/todos/status/completed');

        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Custom search
export const customSearch = (formdata) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('api/todos/mixedSearch', formdata, config);

        dispatch({
            type: SEARCH_RESULT,
            payload: res.data 
        });
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'fixed', 'error' )));
        }

        dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete all todos for logged in user
export const deleteAllTodos = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
          await axios.delete('api/todos/deleteAll');
    
          dispatch({ type: CLEAR_TODOS });

          dispatch(setAlert('All Todo Cards deleted', 'fixed', 'success'));
        } catch (err) {
          dispatch({
            type: TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
        }
      }
}
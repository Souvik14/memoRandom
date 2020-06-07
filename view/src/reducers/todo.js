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
} from '../actions/types';

const initialState = {
    todos: [],
    todo: null,
    loading: true,
    hasChanged: null,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_TODOS:
            return {
                ...state,
                hasChanged: (payload.msg === 'Not found' ? false : true),
                todos: (payload.msg !== 'Not found' ? payload : []),
                loading: false
            };
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, payload],
                loading: false
            }
        case UPDATE_ARCHIVE:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === payload.id ? {...todo, isArchived: payload.isArchived } : todo),
                loading: false
            }
        case GET_ARCHIVED_TODOS: 
            return {
                ...state,
                hasChanged: (payload.msg === 'Not found' ? false : true),
                todos: (payload.msg !== 'Not found' ? payload : []),
                loading: false
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== payload),
                loading: false
            }
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === payload.id ? {...todo, payload} : todo),
                loading: false
            }
        case UPDATE_STATUS:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === payload.id ? {...todo, status: payload.status } : todo),
                loading: false
            }
        case SEARCH_RESULT:
            return {
                ...state,
                hasChanged: (payload.msg === 'Not found' ? false : true),
                todos: (payload.msg !== 'Not found' ? payload : []),
                loading: false
            }
        case TODO_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_TODOS:
            return {
                ...state,
                todos: [],
                todo: null,
                loading: false,
                hasChanged: null
            }
        default:
            return state;
    }
}
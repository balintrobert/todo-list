import {
  ADD_TODO,
  TODO_ERROR,
  DELETE_TODO,
  GET_TODOS,
  CHANGE_TODO,
} from '../actions/types';

const initialState = {
  todos: [],
  loading: true,
  error: {},
};

const todo = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case CHANGE_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todo;

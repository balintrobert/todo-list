import { ADD_TODO, TODO_ERROR, DELETE_TODO } from '../actions/types';

const initialState = {
  todos: [],
  loading: true,
  error: {},
};

const todo = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: { ...state.todos, todos: payload },
        loading: false,
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

import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TODO,
  TODO_ERROR,
  DELETE_TODO,
  GET_TODOS,
  CHANGE_TODO,
} from './types';
import { loadUser } from './auth';

export const getTodos = () => async (dispatch) => {
  try {
    // dispatch(loadUser());
    const res = await axios.get('/api/todos');
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addTodo = ({ text, done = false }) => async (dispatch) => {
  if (text.length < 30) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ text, done });
    try {
      const res = await axios.post('/api/todos', body, config);
      dispatch(getTodos());
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
      dispatch(setAlert('Task created.', 'success'));
    } catch (err) {
      dispatch({
        type: TODO_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  } else {
    dispatch(setAlert('Maximum 30 characters.', 'danger'));
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/todos/${id}`);
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editTodo = (todo) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const text = todo.text;
  const done = !todo.done;
  const body = JSON.stringify({ text, done });
  try {
    const res = await axios.patch(`/api/todos/${todo._id}`, body, config);
    dispatch(getTodos());
    dispatch({
      type: CHANGE_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

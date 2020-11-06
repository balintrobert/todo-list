import axios from 'axios';
import { setAlert } from './alert';
import { ADD_TODO, TODO_ERROR, DELETE_TODO } from './types';

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
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

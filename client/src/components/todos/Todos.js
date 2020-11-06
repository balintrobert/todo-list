import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import TodoItem from './TodoItem';
import { addTodo } from '../../actions/todo';

const Todos = ({
  auth: { isAuthenticated, loading, user },
  logout,
  addTodo,
}) => {
  const [text, setText] = useState('');
  return loading || user === null ? (
    <Spinner />
  ) : (
    <div className='todo-wrapper'>
      <div className='todo'>
        <nav className='navbar'>
          <h2 className='nav-brand'>
            <i className='fas fa-clipboard-check'></i>Todos
          </h2>
          <div className='nav-user'>
            <h4>Hello, {user.username}</h4>
            <button className='btn-logout' onClick={logout}>
              <i className='fas fa-sign-out-alt'></i>
            </button>
          </div>
        </nav>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo({ text });
            setText('');
          }}
          className='add-todo'
        >
          <input
            className='todo-input'
            type='text'
            name='todo'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter task'
          />
          <button className='todo-submit' type='submit'>
            <i className='fas fa-plus'></i>
          </button>
        </form>
        <ul className='tasks'>
          {user === null ? (
            <Spinner />
          ) : (
            user.todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
          )}
        </ul>
      </div>
    </div>
  );
};

Todos.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, addTodo })(Todos);

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTodo } from '../../actions/todo';

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <Fragment>
      <li className='task'>
        <span className={'task-text' + (todo.done ? ' done' : '')}>
          {todo.text}
        </span>
        <span className='actions'>
          <button>
            <i className='fas fa-check-square'></i>
          </button>
          <button>
            <i className='fas fa-minus-square'></i>
          </button>
        </span>
      </li>
    </Fragment>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteTodo })(TodoItem);

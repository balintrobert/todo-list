import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const { username, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match.', 'danger');
    } else {
      register({ username, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/todos' />;
  }

  return (
    <div className='form-wrapper'>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <h2 className='form-title'>
          <i className='fas fa-clipboard-check'></i>Register
        </h2>
        <div className='form-group'>
          <input
            className='form-input'
            type='text'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            placeholder='Username'
            // required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            placeholder='Password'
            // required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            type='password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            placeholder='Confirm password'
            // required
          />
        </div>
        <button className='form-submit' type='submit'>
          Sign up
        </button>
        <p>
          Already have an account?
          <Link to='/login' className='form-link'>
            {' '}
            Login now!
          </Link>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

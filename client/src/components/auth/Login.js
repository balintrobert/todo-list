import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  //  Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/todos' />;
  }

  return (
    <div className='form-wrapper'>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <h2 className='form-title'>
          <i className='fas fa-user'></i>Login
        </h2>
        <div className='form-group'>
          <input
            className='form-input'
            type='text'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            placeholder='Username'
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
          />
        </div>
        <button className='form-submit' type='submit'>
          Sign in
        </button>
        <p>
          Don't have an account?{' '}
          <Link to='/register' className='form-link'>
            Register now!
          </Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

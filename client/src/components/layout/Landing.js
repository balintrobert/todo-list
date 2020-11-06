import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='container'>
      <div className='content'>
        <h2>Welcome to</h2>
        <h1>Todo List App</h1>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Sign up</Link>
      </div>
    </div>
  );
};

export default Landing;

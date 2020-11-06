import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Todos from './components/todos/Todos';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//  Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <div className='alert-container'>
            <Alert />
          </div>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/todos' component={Todos} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

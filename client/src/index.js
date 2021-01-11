import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages';
import SignUp from './pages/signup'
import Login from './pages/login'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages';
import SignUp from './pages/signup'
import Login from './pages/login'
import CreateCall from './pages/createCall'
import { CookiesProvider } from 'react-cookie';
import {HashRouter as Router, Switch, Route} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
            <Route path="/signup">
              <CookiesProvider>
               <SignUp />  
              </CookiesProvider>
            </Route>
            <Route path="/login">
              <CookiesProvider>
                <Login />
              </CookiesProvider>
            </Route>
            <Route path="/createcall">
              <CookiesProvider>
                <CreateCall />
              </CookiesProvider>
            </Route>
            <Route path="/">
              <CookiesProvider>
                <Home />
              </CookiesProvider>
            </Route>
            
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

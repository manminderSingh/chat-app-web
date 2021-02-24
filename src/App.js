import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import AuthService from './../src/services/auth.service';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // setCurrentUser({user: 'val'});
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    AuthService.logout();
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          ChatApp
        </Link>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li> */}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )} */}
        </div>
        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={"/dashboard"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      
      <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
      </div>


    </div>
  );
}

export default App;

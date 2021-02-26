import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required, validEmail, validPassword, validUserName } from '../../util/validation';

import AuthService from "../../services/auth.service";

const Register = () => {

  const history = useHistory();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  }

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  }

  const onChangeEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  }

  const onSubmitRegister = (event) => {
    event.preventDefault();

    setMessage('');
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(response => {
        if (response) {
          setSuccessful(true);
          AuthService.fetchCurrentUser(response).then(result => {
            history.push('dashboard'); 
            history.go(0);  
          }).catch(error => console.log(error));
        } else if (!response) {
          setSuccessful(false);
          setMessage('Email address or Username already exist.');
        }
      }, error => {
        const errorMessage = 
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(errorMessage);
        setSuccessful(false);
      });
    }
  };

  return (

    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={onSubmitRegister} ref={form}>
          {!successful && ( <div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, validUserName]}/>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}/>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, validPassword]}/>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert">
                  {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
};

export default Register;

import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { required, validEmail } from './../util/validation';

import AuthService from '../services/auth.service';

const Login = (props) => {

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  }

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  }

  const onSubmitLogin = (event) => {
    event.preventDefault();

    setMessage('');
    setLoading(true);

    form.current.validateAll();

    if (!checkBtn.current.context._errors.length) {
      AuthService.login(email, password).then(() => {
        // Todo: Have to figure out what would be the path after logging in.
        props.history.push('/dashboard');

        /*  
          Should also get the current user at this point by
          using token response and have it stored on localstorage
        */

      },
      (error) => {
        const errorMessage = (error.response &&
                              error.response.data &&
                              error.response.data.message) ||
                              error.message || error.toString();

        setLoading(false);
        setMessage(errorMessage);
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        {/* Profile pic here */}
        <img
          alt="profile-img"
          className="profile-img-card"
        />
      </div>

      <Form onSubmit={onSubmitLogin} ref={form}>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <Input 
            type='email'
            className='form-control'
            name='email'
            value={email}
            onChange={onChangeEmail}
            validations={[required, validEmail]}/>
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <Input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}/>
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>

        {message && (
          <div className='form-group'>
            <div className='alert alert-danger' role='alert'>
              {message}
            </div>
          </div>
        )}

        <CheckButton style={{ display: 'none' }} ref = {checkBtn}/>
      </Form>
    </div>
  );
};

export default Login;

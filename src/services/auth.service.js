import {API_URL} from '../constants/';

/* 
  Auth Service to register, login, logout and get the currentUser
*/

const register = (username, email, password) => {
  return fetch(`${API_URL}signup`, {  
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "user": {
      "email" : email,
      "password" : password,
      "username": username
    }})
}).then(res => {
    if(res.headers) {
      let token = res.headers.get('Authorization');
      if (token) {
        localStorage.setItem('token', token);
      }
      return token;
    }}).catch(err => console.error(err));
}

const login = (email, password) => {
  return fetch(`${API_URL}login`, {  
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "user": {
      "email" : email,
      "password" : password
    }})
  }).then(data => {
    if (data.headers) {
      let token = data.headers.get('Authorization');
      if (token) {
        localStorage.setItem('token', token);
      }
      return token;
    }}).catch(err => console.log(err));
}

const logout = () => {
  let token = localStorage.getItem('token');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  return fetch(`${API_URL}logout`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(res => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      if(res.ok) {
        return res.json()
      } else {
        return res.json().then(json => Promise.reject(json))
      }
    })
    .then(json => {
      console.dir(json)
    })
    .catch(err => console.error(err))
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
}

const fetchCurrentUser = (token) => {
  return fetch(`${API_URL}authentication/auth`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(res => {
      if(res.ok) {
        return res.json()
      } else if (res.status === "401") {
        throw new Error("Unauthorized Request. Must be signed in.");
      }
    }).then(data => { 
      if (data && data.user && data.user.email) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
      } else {}
    }).catch(err => console.error(err));
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  fetchCurrentUser
}

export default AuthService;

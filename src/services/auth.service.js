import axios from 'axios';

/* 
  Auth Service to register, login, logout and get the currentUser
*/

// Todo: Move this to a config file
const API_URL = "http://localhost:3000/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
}

const login = (email, password) => {
  // return axios
  // .post(API_URL + 'login', {
  //   email,
  //   password,
  // })
  // .then((response) => {
  //   if (response.data) {
  //     console.log(response);
  //     // This should return the token
  //     // localStorage.setItem('currentUser', JSON.stringify(response.data));
  //   }
  //   return response.data;
  // });
  return fetch(`${API_URL}/login`, {  
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "user": {
      "email" : email,
      "password" : password
    }})
  }).then(data => { return data.headers.get('Authorization')}).catch(err => console.error(err))
}

const logout = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  // Logout call to the server should be written here
}

const getCurrentUser = () => {
  // There could be another way to retrieve this value
  return JSON.parse(localStorage.getItem('currentUser'));

}

const fetchCurrentUser = (token) => {
  return fetch(`${API_URL}/authentication/auth`,
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
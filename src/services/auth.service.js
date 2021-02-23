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
  return axios
  .post(API_URL + 'login', {
    email,
    password,
  })
  .then((response) => {
    if (response.data) {
      console.log(response);
      // This should return the token
      // localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
}

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  // Logout call to the server should be written here
}

const getCurrentUser = () => {
  // There could be another way to retrieve this value
  return JSON.parse(localStorage.getItem('user'));
}

const authService = {
  register,
  login,
  logout,
  getCurrentUser
}

export default authService;
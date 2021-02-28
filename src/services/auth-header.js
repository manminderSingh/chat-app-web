export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const token = JSON.parse(localStorage.getItem('token'));

  if (user && token) {
    return { Authorization: token };
  } else {
    return {};
  }
}

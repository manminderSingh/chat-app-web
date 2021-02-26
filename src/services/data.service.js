import {API_URL} from '../constants';

const channelList = () => {
  return fetch(`${API_URL}channels`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json()).then(result => result);
}

const addChannel = (channelName) => {
  let formdata = new FormData();
  formdata.append("name", channelName);

  let options = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch(`${API_URL}channels/`, options)
    .then(response => response.text())
    .then(result => { return result; })
    .catch(error => console.log('error', error));
}

const getChannelMessages = (selectedChannel) => {
  if (selectedChannel && selectedChannel.id) {
    let options = {
      method: 'GET',
      redirect: 'follow'
    };
  
    return fetch(`${API_URL}channels/${selectedChannel.id}`, options)
      .then(response => response.json())
      .then(result => {return result; })
      .catch(error => console.log('error', error));
  }
}

const sendMessage = (selectedChannel, currentUser, message) => {
  let formdata = new FormData();
  formdata.append("channel_id", selectedChannel.id);
  formdata.append("message", message);
  formdata.append("user_id", currentUser.id);

  let options = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

fetch(`${API_URL}messages/`, options)
  .then(response => response.text())
  .then(result => result)
  .catch(error => console.log('error', error));
}

const getAllUsers = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  return fetch(`${API_URL}users`, requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log('error', error));
}

const DataService = {
  channelList,
  addChannel,
  getChannelMessages,
  getAllUsers,
  sendMessage
}

export default DataService;
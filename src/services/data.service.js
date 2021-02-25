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
  let formData = buildFormData('name', channelName);
  let options = requestOptions('POST', formData);

fetch(`${API_URL}channels/`, options)
  .then(response => response.text())
  .then(result => { console.log(result); return result})
  .catch(error => console.log('error', error));
}

const buildFormData = (key, value) => {
  let formData = new FormData();
  formData.append(key, value);
  return formData;
}

const requestOptions = (method, formData) => {
  return {
    method: method,
    body: formData,
    redirect: 'follow'
  }
}

const DataService = {
  channelList,
  addChannel
}

export default DataService;
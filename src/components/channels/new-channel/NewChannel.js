import React, { useRef, useState } from 'react';
import Form from 'react-validation/build/form';
import classNames from 'classnames';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import DataService from '../../../services/data.service';
import { isInputEmpty } from '../../../util/validation';

import './NewChannel.scss';

const NewChannel = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [channelName, setChannelName] = useState('');
  const [message, setMessage] = useState('');
  const disableButton = isInputEmpty(channelName);

  const className = classNames('channels', {
    'active': disableButton
  });

  const onSubmitChannel = (event) => {
    event.preventDefault();
    if (!checkBtn.current.context._errors.length) {
      DataService.addChannel(channelName).then(response => {
        if (response) {
          response = JSON.parse(response);
          if (response.status === 403) {
            setMessage(response.message);
          }
        }
      });
      setChannelName('');
    }
  }
 
  return (
    <Form id='new-message-container' onSubmit={ onSubmitChannel } ref={form}>
     <label hidden={true} htmlFor='addChannel'>Add Channel</label>
      <Input
        className='addChannel'
        id='addChannel'
        type='text' 
        placeholder='Add Channel'
        value={ channelName }
        onChange={ (e) => { setChannelName(e.target.value) }}/>
      <button className={ className } disabled={ disableButton }>+</button>
        {message && setTimeout(function() { alert(message); setMessage(''); }, 100)}
      <CheckButton style={{ display: 'none' }} ref = {checkBtn}/>
    </Form>
  );
};

export default NewChannel;

import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import './ChatForm.scss';
import { isInputEmpty } from '../../util/validation';

import DataService from '../../services/data.service';

const ChatForm = ({ selectedChannel, currentUser } ) => {
  
  const [textMessage, setTextMessage] = useState('');
  const isMessageEmpty = isInputEmpty;
  const disableButton = isMessageEmpty(textMessage);
  const form = useRef();
  const className = classNames('channels', {
    'active': disableButton
  });

  let formContents = null;
  let handleFormSubmit = null;

  if (selectedChannel) {
    formContents = (
      <>
        <Input
          type='text'
          placeholder={`Message ${selectedChannel.name}`}
          value={textMessage}
          onChange={ (e)=> {setTextMessage(e.target.value);} }/>
        <button className={className} disabled={ disableButton }>Send</button>
      </>
    )
  }

  const onMessageSubmitted = (textMessage) => {
    // Propogate the changes up stream to the rails app
    DataService.sendMessage(selectedChannel, currentUser, textMessage);
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if(!isMessageEmpty(textMessage)) {
      onMessageSubmitted(textMessage);
      setTextMessage('');
    }
  }

  return (
    <Form id='chat-form' onSubmit={handleFormSubmit} ref={form}>
      { formContents }
    </Form>
  )
}

export default ChatForm;

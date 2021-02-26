import React, { useRef, useState } from 'react';
import Form from 'react-validation/build/form';
import classNames from 'classnames';
import Input from 'react-validation/build/input';

import DataService from '../../../services/data.service';
import { isInputEmpty } from '../../../util/validation';

import './NewChannel.scss';

const NewChannel = () => {
  const form = useRef();
  const [channelName, setChannelName] = useState('');
  const disableButton = isInputEmpty(channelName);

  const className = classNames('channels', {
    'active': disableButton
  });

  const onSubmitChannel = (event) => {
    event.preventDefault();
    DataService.addChannel(channelName);
    setChannelName('');
  }
 
  return (
    <Form id='new-message-container' onSubmit={ onSubmitChannel } ref={form}>
      <Input
        type='text' 
        placeholder='Add Channel'
        value={ channelName }
        onChange={ (e) => { setChannelName(e.target.value) }}/>
      <button className={ className } disabled={ disableButton }>+</button>
    </Form>
  );
};

export default NewChannel;

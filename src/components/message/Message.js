import React, { useState } from 'react';
import './Message.scss';
import classNames from 'classnames';

const Message = (props) => {
  // These value would be propogated from the message list
  const [message, setMessage] = useState('')
  const [isMyMessage, setIsMyMessage] = useState(false);
  const messageClasses = classNames('message-row', {
    'you-message': isMyMessage,
    'other-message': !isMyMessage
  });
  return (
    <div className={messageClasses}>
      <div className='message-content'>
        {/* Image here */}
        <div className='message-user'>
          {/* {message.user.username} */}
        </div>
        <div className='message-text'>
          {/* {message.value} */}
        </div>
        <div className='message-time'>
          {/* message .created at */}
        </div>
      </div>

    </div>
  )
}

export default Message;
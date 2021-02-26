import React from 'react';
import './Message.scss';
import classNames from 'classnames';

const Message = ({isMyMessage, message}) => {
  const messageClass = classNames('message-row', {
    'you-message': isMyMessage,
    'other-message': !isMyMessage
  });

  const imageThumbnail = isMyMessage ? null : <img src={'http://ssl.gstatic.com/accounts/ui/avatar_1x.png'} alt={''} />;
  return (
    <div className={messageClass}>
      <div className='message-content'>
        {imageThumbnail}
        <div className='message-wrapper'>
          <p align='left' className='message-username'>{ isMyMessage ? 'You' : message.username }</p>
          <p align='left' className='message-text'>{ message.message }</p>
        </div>
        <div className='message-time'>
          { new Date(message.created_at).toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
        </div>
      </div>
    </div>
  );
}

export default Message;

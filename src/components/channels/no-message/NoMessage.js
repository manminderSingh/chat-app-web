import React from 'react';

import './NoMessage.scss';

const NoMessage = () => {
  return (
    <div id='no-message-layout'>
      <div id="no-message-content">
        <h2>No Messages</h2>
        <p>Currently this channel has no messages.</p>
        <p>To start a new conversation, please send a message below.</p>
      </div>
    </div>
  )
}

export default NoMessage;
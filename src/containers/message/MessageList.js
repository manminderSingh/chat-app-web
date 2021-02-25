import React, { useEffect } from 'react';

import Message from '../../components/message/Message';
import './MessageList.scss';

const MessageList = () => {
    // Get messages from the 
    // const messageDetails = 
    let messageItems = null;

    return (
      <div id="chat-message-list">
          {messageItems}
          Here
      </div>
  );

}

export default MessageList;
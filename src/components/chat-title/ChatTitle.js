import React from 'react';

import './ChatTitle.scss';

const ChatTitle = ({ selectedChannel }) => {
  let chatTitleContents = null;

  if (selectedChannel) {
    chatTitleContents = (
      <>
        <span>{ selectedChannel.name }</span>
      </>
    );
  }

  return(
    <div id='chat-title'>
      { chatTitleContents }
    </div>
  )
}

export default ChatTitle;
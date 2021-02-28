import React, { useEffect, useState } from 'react';

import Message from '../../components/message/Message';
import './MessageList.scss';

import DataService from '../../services/data.service';

const MessageList = ({currentUser, messages}) => {

  const [allUsers, setAllUsers] = useState('');

  let messageItems = null;

  // Get all users
  useEffect(() => {
    if (!allUsers) {
      DataService.getAllUsers().then(result => {
        if (result && result.length > 0) {
          setAllUsers(result);
        }
      })
    }
  },[allUsers])

  const mapUsersToMessages = (allUsers, messages) => {
    const userMap = allUsers.reduce((map, { id, username }) => {
      let user = map.get(id) || []
      user.push(username)
      return map.set(id, user)
    }, new Map());

    const newMessageList = messages.map(({ user_id, message, id, channel_id, created_at}) => ({
      id,
      user_id,
      message,
      channel_id,
      created_at,
      username: (userMap.get(user_id) || []).join(', ')
    }));

    return newMessageList;
  }

  if (messages && messages.length > 0) {
    if (allUsers) {
      let newMessageList = mapUsersToMessages(JSON.parse(allUsers), messages);
      if (newMessageList) {
        messageItems = newMessageList.map((message, index) => { 
          return (
            <Message
              key={index}
              isMyMessage={currentUser.id === message.user_id}
              message={message}
            />
          )
        });
      }
    }
  }

  return (
    <div id="chat-message-list">
      {messageItems}
    </div>
  );

}

export default MessageList;

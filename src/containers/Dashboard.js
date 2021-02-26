import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChannelList from '../components/channels/channel-list/ChannelList';
import NewChannel from '../components/channels/new-channel/NewChannel';
import ChatTitle from '../components/chat-title/ChatTitle';
import MessageList from './message/MessageList';
import NoMessage from '../components/channels/no-message/NoMessage';
import ChatForm from '../components/chat-form/ChatForm';
import ChannelTitle from '../components/channels/channel-title/ChannelTitle';

import AuthService from '../services/auth.service';
import DataService from '../services/data.service';
import actioncable from 'actioncable';

import { API_WS_URL} from './../constants/';

import './Dashbaord.scss';

const Dashboard = () => {

  const [channelList, setChannelList] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [channelMessages, setChannelMessages] = useState('');
  let cable;

  /* 
  This has to be moved to maybe the App.js file
  */
  cable = ((instance) => {
    instance = actioncable.createConsumer(API_WS_URL);
    return instance;
  })(cable);

  // Get Channels list - Run Once at the component mount
  useEffect(() => {
    DataService.channelList().then(result => {
      setChannelList(result);
      if (result.length > 0 && !selectedChannel) {
        setSelectedChannel(result[0]);
      }
    });
  },[selectedChannel])

  // Get messages associated with the selected channel
  useEffect(() => {
    if (selectedChannel) {
      DataService.getChannelMessages(selectedChannel).then(result => {
        if (result && result.messages.length > 0) {
          let messages = result.messages;
          setChannelMessages(messages);
        }
      })
    }
  },[selectedChannel])

  // Web Socket - Listening to channel getting added
  useEffect(() => {
    let isMounted = true;
    cable.subscriptions.create({
      channel: `ChannelsChannel`
    },
    { connected: () => {},
      disconnected: () => { console.log('disconnected'); },
      received: data => {
        if (isMounted) {
          let newChannel = data.channel;
          let existingChannelList = channelList;
          if (existingChannelList && newChannel) {
            let existingIds = existingChannelList.map(existingChannel => existingChannel.id);
            let hasDuplicate = existingIds.some((item, idx) => existingIds.indexOf(item) !== idx);
            if (!hasDuplicate) {
              existingChannelList = [...existingChannelList, newChannel];
              setChannelList(existingChannelList);
            };
          };
        }
      }
    });
    return () => { isMounted = false }
  });

  // Web Socket - Listening to any message changes
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    cable.subscriptions.create({
      channel: `MessagesChannel`
    },
    { connected: () => {},
      disconnected: () => console.log('disconnected'),
      received: data => {
        if (isMounted) {
          let newMessage = data.message;
          let existingMessages = channelMessages;
          if (existingMessages && newMessage) {
            let existingIds = existingMessages.map(existingMessage => existingMessage.id);
            let hasDuplicate = existingIds.some((item, index) => existingIds.indexOf(item) !== index);
            if (!hasDuplicate) {
              if (newMessage.channel_id === parseInt(selectedChannel.id)) {
                let newMessages = [...existingMessages, newMessage];
                setChannelMessages(newMessages);
              }
            };
          };
        }
      }
    });
    return () => { isMounted = false }
  });

  const currentUser = AuthService.getCurrentUser();
  const history = useHistory();

  if (currentUser && currentUser.id && currentUser.email) {
    let channelContent = (
      <> <NoMessage selectedChannel={selectedChannel}/> </>
    );

    if (channelMessages && channelMessages.length > 0) {
      channelContent = (
        <>
          <MessageList 
            currentUser={currentUser}
            messages={channelMessages} />
        </>
      )
    };

    return(
      <div id='chat-container'>
        <ChannelTitle/>
        <ChannelList
          selectedChannel={selectedChannel}
          channels={channelList} 
          onChannelItemSelected={(channel) => { setSelectedChannel(channel); setChannelMessages([]); }}/>
        <NewChannel selectedChannel={selectedChannel}/>
        <ChatTitle 
          selectedChannel={selectedChannel}/>
        {channelContent}
        <ChatForm selectedChannel={selectedChannel} currentUser={currentUser}/>
      </div>
    );
  } else {
    history.push('login');
    history.go(0);
    return null;
  }
}

export default Dashboard;

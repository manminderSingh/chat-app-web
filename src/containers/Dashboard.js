import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import ChannelList from '../components/channels/channel-list/ChannelList';
import NewChannel from '../components/channels/new-channel/NewChannel';
import ChatTitle from '../components/chat-title/ChatTitle';
import MessageList from './message/MessageList';
import NoMessage from '../components/channels/no-message/NoMessage';
import ChatForm from '../components/chat-form/ChatForm';
import ChannelTitle from '../components/channels/channel-title/ChannelTitle';

import AuthService from '../services/auth.service';
import DataSocket from '../services/data.socket';
import DataService from '../services/data.service';
import actioncable from 'actioncable';

import { API_WS_URL} from './../constants/';

import './Dashbaord.scss';

const Dashboard = () => {

  const [runOnce, setRunOnce] = useState(false);
  const [channelList, setChannelList] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');

  let cable;

  /* 
  This has to be moved to maybe the App.js file
  */
  cable = ((instance) => {
    instance = actioncable.createConsumer(API_WS_URL);
    return instance;
  })();

  useEffect(() => {
    DataService.channelList().then(result => {
      setChannelList(result);
    });
  },[])

  useEffect(() => {
    cable.subscriptions.create({
      channel: `ChannelsChannel`
    }, {connected: () => {},
        disconnected: () => { console.log('disconnected'); },
        received: data => {
          let newChannel = data.channel;
          let existingChannelList = channelList;
          if (existingChannelList && newChannel) {
            let existingIds = existingChannelList.map(existingChannel => {
              return existingChannel.id;
            });
            let hasDuplicate = existingIds.some((item, idx) => { 
              return existingIds.indexOf(item) !== idx 
            });
            if (!hasDuplicate) {
              existingChannelList = [...existingChannelList, newChannel];
              setChannelList(existingChannelList);
            }
          }
        }
    })
  })

  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())
  const history = useHistory();

  if (currentUser && currentUser.id && currentUser.email) {
    let messages = []; // Pull from socket connection
    let channelContent = (
      <><NoMessage/></>
    );

    if (messages && messages.length > 0) {
      channelContent = (
        <><MessageList/></>
      )
    };

    return(
      <div id='chat-container'>
        <ChannelTitle/>
        <ChannelList
            selectedChannel={selectedChannel}
            channels={channelList} 
            onChannelItemSelected={(channel) => { setSelectedChannel(channel) }}/>
        <NewChannel/>
        <ChatTitle 
            selectedChannel={selectedChannel}/>
        {channelContent}
        <ChatForm selectedChannel={selectedChannel}/>
      </div>
    );
  } else {
    history.push('login');
    return null;
  }
}

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import ChannelList from '../components/channels/channel-list/ChannelList';
import NewChannel from '../components/channels/new-channel/NewChannel';
import ChatTitle from '../components/chat-title/ChatTitle';
import MessageList from './message/MessageList';
import NoMessage from '../components/channels/no-message/NoMessage';
import ChatForm from '../components/chat-form/ChatForm';
import ChannelSearch from '../components/channels/channel-search/ChannelSearch';

import AuthService from '../services/auth.service';
import DataSocket from '../services/data.socket';
import DataService from '../services/data.service';

import './Dashbaord.scss';

const Dashboard = () => {

  const [cable, setCable] = useState('');
  const [runOnce, setRunOnce] = useState(false);
  const [channelList, setChannelList] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');

  useEffect(() => {
    DataService.channelList().then(result => {
      setChannelList(result);
    });
    // DataSocket.channelList();
  },[])

  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())
  // console.log(currentUser);
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
        <ChannelSearch/>
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
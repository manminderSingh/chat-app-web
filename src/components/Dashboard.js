import React, {useState, useEffect, useRef} from 'react';
import { useHistory} from 'react-router-dom';
import ChannelList from './channels/channel-list/ChannelList';
import NewChannel from './channels/new-channel/NewChannel';
import ChatTitle from './chat-title/ChatTitle';

import AuthService from '../services/auth.service';

import './Dashbaord.scss';


const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())
  console.log(currentUser);
  const history = useHistory();

  if (currentUser && currentUser.id && currentUser.email) {
    return(
      <div id='chat-container'>
        <ChannelList>

        </ChannelList>
        <NewChannel/>
        <ChatTitle>

        </ChatTitle>
      </div>
    );
  } else {
    history.push('login');
    return null;
  }
}

export default Dashboard;
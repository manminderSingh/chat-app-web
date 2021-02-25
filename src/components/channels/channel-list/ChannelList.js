import React from 'react';

import Channel from '../channel/Channel';

import './ChannelList.scss';

const ChannelList = ({selectedChannel, onChannelItemSelected, channels}) => {

  let channelItems = null;

  if (channels && channels.length > 0) {
    channelItems = channels.map((channel, index) => {
      const channelIsActive = selectedChannel && channel.id === selectedChannel.id;

      return <Channel 
          key= { channel.id } 
          onChannelItemSelected={ onChannelItemSelected }
          isActive={ channelIsActive }
          channel={ channel }  />
    });
  }

  return (
    <div id='channel-list'>
     {channelItems}
    </div>
  )

}

export default ChannelList

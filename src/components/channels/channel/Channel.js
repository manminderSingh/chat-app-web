import React from 'react';
import classNames from 'classnames';
import './Channel.scss'

const Channel= ({channel, isActive, onChannelItemSelected}) => {
  const className = classNames('channel', {
    'active': isActive
  });

  return (
    <div className={className} onClick={() => onChannelItemSelected(channel)}>
        <div className="title-text">{channel.name}</div>
    </div>
  );
}

export default Channel;

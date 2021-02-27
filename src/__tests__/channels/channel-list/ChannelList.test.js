import * as React from 'react'
import ReactDOM from 'react-dom'
import ChannelList from '../../../components/channels/channel-list/ChannelList';
import { mockAllChannels, mockSelectedChannel, mockNonExistentChannel } from '../../../helper/channelMockData';

let selectedChannel, allChannels, nonExistentChannel;
const div = document.createElement('div');

// Run before each test
beforeEach(() => {
  document.body.append(div);
  document.body.innerHTML = '';
  allChannels = mockAllChannels();
  selectedChannel = mockSelectedChannel();
  nonExistentChannel = mockNonExistentChannel();
});

test('the number of channels', () => {
 
  const list = allChannels.length;
  ReactDOM.render(<ChannelList channels={allChannels}/>, div);
  const channelArray = div.querySelector('#channel-list');
  const childrenLength = channelArray.children.length;

  expect(childrenLength).toEqual(list);
});

test('if the selected channel exist in the list of channels', () => {
 
  ReactDOM.render(<ChannelList channels={allChannels}/>, div);
  const channelArray = div.querySelector('#channel-list');
  const channelChildren = channelArray.children;
  const childrenLength = channelChildren.length;

  expect(channelChildren[childrenLength - 1].textContent).toEqual(selectedChannel.name);
})

test('if the nonexistent channel does exist', () => {
  
  ReactDOM.render(<ChannelList channels={allChannels}/>, div);

  // Gets the html element for individual channel (children)
  const channelChildren = div.querySelector('#channel-list').children;
  let childrenArray = [];

  //Converting the object into channel array
  for (const property in channelChildren) {
    childrenArray.push(channelChildren[property]);
  }

  //Checking for existence of non-existent record
  const doesExist = childrenArray.filter(child => {
    return child.id === nonExistentChannel.id;
  });

  expect(doesExist.length).toBe(0);
});

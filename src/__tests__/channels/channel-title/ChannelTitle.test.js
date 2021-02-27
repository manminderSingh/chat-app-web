import * as React from 'react'
import ReactDOM from 'react-dom'
import ChannelTitle from '../../../components/channels/channel-title/ChannelTitle';

beforeEach(() => {
  document.body.innerHTML = '';
})

test('the text for the channel title', () => {
  const div = document.createElement('div')
  document.body.append(div)
  const expected = 'Channels';

  ReactDOM.render(<ChannelTitle />, div)
  const container = div.querySelector('#channel-title')
  expect(container.textContent).toBe(expected);
});
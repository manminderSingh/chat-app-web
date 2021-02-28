import * as React from 'react'
import ReactDOM from 'react-dom'
import ChatTitle from '../../../components/chat-title/ChatTitle';
import { mockSelectedChannel } from '../../../helper/channelMockData';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const selectedChannel = mockSelectedChannel();

describe("The ChatTitle component", () => {

  beforeEach(() => {
    document.body.innerHTML = '';
  })

  test("should mount properly", () => {
    const component = shallow(
      <ChatTitle
        selectedChannel={selectedChannel}
      />);
    expect(component.length).toEqual(1);
  });
  
  test('the text for the chat title', () => {
    const div = document.createElement('div')
    document.body.append(div)
  
    ReactDOM.render(<ChatTitle selectedChannel={selectedChannel}/>, div)
    const container = div.querySelector('#chat-title')
    expect(container.textContent).toBe(selectedChannel.name);
  });
  
});

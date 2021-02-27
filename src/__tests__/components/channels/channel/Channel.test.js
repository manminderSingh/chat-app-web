import * as React from 'react'
import ReactDOM from 'react-dom'
import Channel from '../../../../components/channels/channel/Channel';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const div = document.createElement('div')
let channel;

describe('The Channel component', () => {

  beforeEach(() => {
    document.body.append(div);
    document.body.innerHTML = '';
    channel = { name: 'Channels' };
  });

  test('should mount Channel properly', () => {
    const component = shallow(
      <Channel channel={channel}/>);
    expect(component.length).toEqual(1);
  });
  
  test('the text for the channel title', () => {
   
    const expected = 'Channels';
    ReactDOM.render(<Channel channel={channel} />, div);
    const message = div.querySelector('.channel');
  
    expect(message.textContent).toBe(expected);
  });
  
  test('if the channel is active or not', () => {
  
    const classNameChannel = 'channel';
    const classNameActive = 'active';
    const channel = { name: 'Channels'};
  
    ReactDOM.render(<Channel channel={channel} isActive={true} />, div);
    const container = div.querySelector('.channel');
  
    expect(container.classList).toContain(classNameActive)
    expect(container.classList).toContain(classNameChannel)
  });
  
});

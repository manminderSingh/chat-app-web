import * as React from 'react'
import ReactDOM from 'react-dom'
import ChannelTitle from '../../../../components/channels/channel-title/ChannelTitle';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


describe("The ChannelTitle component", () => {
  
  beforeEach(() => {
    document.body.innerHTML = '';
  })
  
  test("should mount ChannelTitle properly", () => {
    const component = shallow(
      <ChannelTitle/>);
    expect(component.length).toEqual(1);
  });
  
  test('the text for the channel title', () => {
    const div = document.createElement('div')
    document.body.append(div)
    const expected = 'Channels';
  
    ReactDOM.render(<ChannelTitle />, div)
    const container = div.querySelector('#channel-title')
    expect(container.textContent).toBe(expected);
  });

});

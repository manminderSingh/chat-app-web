import * as React from 'react';
import ReactDOM from 'react-dom'
import Message from '../../../components/message/Message';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const div = document.createElement('div');
let messageRecord;

let isMyMessage = false;
const fakeRecord = () => {
  return {
    message: {
      channel_id: 29,
      id: 62,
      message: "haha",
      user_id: 7,
      username: "Nicky",
      created_at: "2021-02-26T03:31:08.123Z"
    }
  };
};

describe('The Message component', () => {

  beforeEach(() => {
    document.body.append(div);
    document.body.innerHTML = '';
    messageRecord = fakeRecord();
  });
  
  test('should mount Message properly', () => {
    const component = shallow(
      <Message message={messageRecord} isMyMessage={isMyMessage}/>);
    expect(component.length).toEqual(1);
  });
  
  test('if the message belongs to a different user', () => {
    const classNameChannel = 'message-row';
    const classNameOtherMessage = 'other-message';
  
    ReactDOM.render(<Message message={messageRecord.message} isMyMessage={isMyMessage} />, div);
    const container = div.querySelector('.message-row');
  
    expect(container.classList).toContain(classNameOtherMessage);
    expect(container.classList).toContain(classNameChannel);


  });

  test('if the message belongs to current user', () => {
    const classNameChannel = 'message-row';
    const classNameYouMessage = 'you-message';
  
    ReactDOM.render(<Message message={messageRecord.message} isMyMessage={!isMyMessage} />, div);
  
    const wrapper = div.querySelector('.message-row');

    expect(wrapper.classList).toContain(classNameYouMessage);
    expect(wrapper.classList).toContain(classNameChannel);

  });
  
});

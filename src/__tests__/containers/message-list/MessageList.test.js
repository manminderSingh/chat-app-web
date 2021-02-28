import * as React from 'react'
import ReactDOM from 'react-dom'
import MessageList from '../../../containers/message-list/MessageList';
import {mockAllMessages } from '../../../helper/messageMockData';
import { mockCurrentUser, mockNoUsers } from '../../../helper/userMockData';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

let allMessages, currentUser, allUsers;
const div = document.createElement('div');

describe('The MessageList Component', () => {

  beforeEach(() => {
    document.body.append(div);
    document.body.innerHTML = '';
    currentUser = mockCurrentUser();
    allMessages = mockAllMessages();
    allUsers = mockNoUsers();
  });

  test("should mount MessageList properly", () => {
    const component = shallow(
      <MessageList messages={allMessages} currentUser={currentUser}/>);

    expect(component.length).toEqual(1);
  });

  test('the number of messages when there are no user selected', () => {
  
    ReactDOM.render(<MessageList messages={allMessages} currentUser={currentUser}/>, div);
    const messageArray = div.querySelector('#chat-message-list');
    const childrenLength = messageArray.length === undefined ? 0 : messageArray.length;

    expect(childrenLength).toEqual(allUsers.length);
  });

});

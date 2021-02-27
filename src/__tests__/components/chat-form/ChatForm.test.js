import * as React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build } from '@jackfranklin/test-data-bot'
import ReactDOM from 'react-dom'
import ChatForm from '../../../components/chat-form/ChatForm';
import { mockSelectedChannel } from '../../../helper/channelMockData';
import { mockCurrentUser } from '../../../helper/userMockData';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const div = document.createElement('div');
let expectedValue, originalValue;
let selectedChannel = mockSelectedChannel(), currentUser = mockCurrentUser();

const buildNewChatForm = build({
  fields: {
    textMessage: 'Hi there!'
  }
});

const fakeRecord = () => {
  return {
    textMessage: 'Hi there!',
    errorMessage: 'Sorry, the record does not exist'
  }
};

describe("The ChatForm component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    document.body.append(div);
    document.body.innerHTML = '';
    originalValue = fakeRecord();
    expectedValue = buildNewChatForm();
  });
  
  test("should mount ChatForm properly", () => {
    const component = shallow(
      <ChatForm
        currentUser={currentUser}
        selectedChannel={selectedChannel}
      />);
    expect(component.length).toEqual(1);
  });
  
  test(`set text message`, async () => {
    render(<ChatForm selectedChannel={selectedChannel} currentUser={currentUser}/>);
    userEvent.type(screen.getByLabelText('Add Message'), originalValue.textMessage);
    expect(screen.getByDisplayValue(expectedValue.textMessage)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', {name: /Send/i}));
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });
  
  test(`current user and selected channel is valid`, () => {
    const user = {
      id: 7,
      name: 'Nicky'
    };
    const channel = {
      name: "app4",
      id: "108"
    }
    ReactDOM.render(<ChatForm selectedChannel={selectedChannel} currentUser={currentUser}/>, div);
    expect(currentUser.id).toBe(user.id);
    expect(currentUser.username).toBe(user.name);
    expect(selectedChannel.id).not.toBe(channel.id);
    expect(selectedChannel.name).not.toBe(channel.name);
  });

});

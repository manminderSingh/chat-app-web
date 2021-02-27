import * as React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build } from '@jackfranklin/test-data-bot'
import ChatForm from '../../components/chat-form/ChatForm';
import { mockSelectedChannel } from '../../helper/channelMockData';
import { getCurrentUser } from '../../helper/userMockData';

const div = document.createElement('div');
let expectedValue, originalValue;

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

beforeEach(() => {
  document.body.append(div);
  document.body.innerHTML = '';
  originalValue = fakeRecord();
  expectedValue = buildNewChatForm();
});

test(`set text message`, async () => {
  render(<ChatForm selectedChannel={mockSelectedChannel()} currentUser={getCurrentUser()}/>);
  userEvent.type(screen.getByLabelText('Add Message'), originalValue.textMessage)
  expect(screen.getByDisplayValue(expectedValue.textMessage)).toBeInTheDocument()
  userEvent.click(screen.getByRole('button', {name: /Send/i}))
  expect(screen.getByDisplayValue('')).toBeInTheDocument()
});

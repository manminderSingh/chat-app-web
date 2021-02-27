import * as React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build } from '@jackfranklin/test-data-bot'
import NewChannel from '../../../components/channels/new-channel/NewChannel';

const div = document.createElement('div');
let expectedName, originalName;

// Considering that we have channels based on departments
const buildNewChannelForm = build({
  fields: {
    name: 'Development'
  }
});

const fakeRecord = () => {
  return {name: 'Development'}
}

beforeEach(() => {
  document.body.append(div);
  document.body.innerHTML = '';
  originalName = fakeRecord();
  expectedName = buildNewChannelForm();
})

test(`new channel creation`, async () => {
  render(<NewChannel />);
  userEvent.type(screen.getByLabelText(/Add Channel/i), originalName.name)
  expect(screen.getByDisplayValue(expectedName.name)).toBeInTheDocument()
  userEvent.click(screen.getByRole('button', {name: /\+/i}))
  expect(screen.getByDisplayValue('')).toBeInTheDocument()
});

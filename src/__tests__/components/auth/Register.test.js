import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Register from '../../../components/auth/Register';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const buildRegisterForm = build({
  fields: {
    email: fake(f => f.internet.email()),
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  }
})

const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/signup',
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({message: 'password required'}))
      }
      if (!req.body.email) {
        return res(ctx.status(400), ctx.json({message: 'email required'}))
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({message: 'username required'}))
      }
      return res(ctx.json({email: req.body.email}))
    },
  )
);

describe("The Register component", () => {

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test("should mount Register properly", () => {
    const component = shallow(
      <Register/>);
    expect(component.length).toEqual(1);
  });

  test(`logging in displays the user's email`, async () => {
    render(<Register />)
    const {email, username, password} = buildRegisterForm()

    userEvent.type(screen.getByLabelText(/Email/i), email)
    userEvent.type(screen.getByLabelText(/Username/i), username)
    userEvent.type(screen.getByLabelText(/Password/i), password)
    userEvent.click(screen.getByRole('button', {name: /Sign Up/i}))

    expect(screen.getByDisplayValue(email)).toBeInTheDocument()
  });

});

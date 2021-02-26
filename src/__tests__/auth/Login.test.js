import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/auth/Login';
import ReactDOM from 'react-dom'

const buildLoginForm = build({
  fields: {
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
  }
})

const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({message: 'password required'}))
      }
      if (!req.body.email) {
        return res(ctx.status(400), ctx.json({message: 'email required'}))
      }
      return res(ctx.json({email: req.body.email}))
    },
  ),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's email`, async () => {
  render(<Login />)
  const {email, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/Email/i), email)
  userEvent.type(screen.getByLabelText(/Password/i), password)
  userEvent.click(screen.getByRole('button', {name: /Login/i}))

  expect(screen.getByDisplayValue(email)).toBeInTheDocument()
});
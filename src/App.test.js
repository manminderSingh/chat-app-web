import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.scss';

test('renders to match dom tree', () => {
  const component = renderer.create((<BrowserRouter><App /></BrowserRouter>));
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

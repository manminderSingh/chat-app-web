import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.scss';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


describe('The App Component', () => {

  test('renders to match dom tree', () => {
    const component = renderer.create(<BrowserRouter><App /></BrowserRouter>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should mount App properly", () => {
    const component = shallow(
      <BrowserRouter><App /></BrowserRouter>);

    expect(component.length).toEqual(1);
  });
  

});

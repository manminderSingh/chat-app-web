import * as React from 'react'
import ReactDOM from 'react-dom'
import NoMessage from '../../../../components/channels/no-message/NoMessage';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


const div = document.createElement('div')
let noMessage;

describe("The NoMessage component", () => {

  beforeEach(() => {
    document.body.append(div);
    document.body.innerHTML = '';
    noMessage = 'No Messages';
  });

  test("should mount NoMessage properly", () => {
    const component = shallow(
      <NoMessage/>);
    expect(component.length).toEqual(1);
  });
  
  test('if no message displays default text', () => {
  
    ReactDOM.render(<NoMessage />, div);
    const h2El = div.querySelector('h2');
    const parentEl = div.querySelector('#no-message-content');
  
    expect(h2El.textContent).toContain(noMessage);
    expect(parentEl.children.length).not.toEqual(0);
    expect(parentEl.children.length).toBe(3);
  });
  
});

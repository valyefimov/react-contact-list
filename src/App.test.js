import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import App from './App';

let wrapper;

describe('<App />', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should have 3 routes', () => {
    expect(wrapper.find(Route).length).toBe(3);
  });
});

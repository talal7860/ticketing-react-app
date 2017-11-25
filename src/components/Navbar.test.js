import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render a Navbar successfully', () => {
    const wrapper = shallow(<Navbar history={{}} />);
    expect(wrapper).toMatchSnapshot();
  });

});

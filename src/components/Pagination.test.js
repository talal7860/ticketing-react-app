import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should render a Pagination Component successfully', () => {
    const wrapper = shallow(<Pagination onPageChange={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

});


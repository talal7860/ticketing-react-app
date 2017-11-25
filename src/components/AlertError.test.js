import React from 'react';
import { shallow } from 'enzyme';
import AlertError from './AlertError';
import { Alert } from 'reactstrap';

describe('AlertError', () => {
  it('should render an Alert when an error is provided to it', () => {
    const wrapper = shallow(<AlertError error="error" />);

    expect(wrapper).toMatchSnapshot();
  });

});


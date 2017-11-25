import React from 'react';
import { shallow } from 'enzyme';
import FormInput from './FormInput';
import { FormGroup } from 'reactstrap';

describe('FormInput', () => {
  it('should render a FormGroup tag when this input is rendered  provided', () => {
    const wrapper = shallow(<FormInput id="id" type="type" label="label" placeholder="placeholder" name="yo" value="" onChange={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

});

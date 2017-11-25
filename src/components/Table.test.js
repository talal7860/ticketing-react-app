import React from 'react';
import { shallow } from 'enzyme';
import Table from './Table';
import { Table as BootstrapTable } from 'reactstrap';

describe('Table', () => {
  it('should render a Table Component successfully with some dummy data', () => {
    const data = [{
      id: '1',
      name: 'test',
    }];
    const columns = {
      id: 1,
      name: 1,
    };

    const wrapper = shallow(<Table name='table' data={data} columns={columns} />);

    expect(wrapper.find(BootstrapTable)).toHaveLength(1);
  });

});



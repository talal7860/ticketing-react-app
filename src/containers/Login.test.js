import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Button } from 'reactstrap';
import App from '../App';
import Login from 'containers/Login';
import Home from 'containers/Home';
import { ACCESS_TOKEN_KEY } from 'consts/AppConstant';
import localforage from 'localforage';
import { mockResponse } from '__mocks__/fetch';

window.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve(mockResponse(201, null, '{"data":{"token": "1234", "type": "Customer"}}')));

describe('Login', () => {
  it('should render login page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/login' ]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });

});

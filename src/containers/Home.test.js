import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Button } from 'reactstrap';
import App from '../App';
import Login from 'containers/Login';
import Home from 'containers/Home';
import { ACCESS_TOKEN_KEY, USER_INFO_KEY, USER_TYPE_CUSTOMER } from 'consts/AppConstant';
import localforage from 'localforage';
import { mockResponse } from '__mocks__/fetch';

window.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve(mockResponse(201, null, '{"data":{"token": "1234", "type": "Customer"}}')));

describe('Home', () => {
  it('should set access token', () => {
    localforage.setItem(ACCESS_TOKEN_KEY, "123")
    .then(() => {
      localforage.getItem(ACCESS_TOKEN_KEY)
        .then((value, err) => {
          expect(value).toBe("123")
        })
    });
  });

});

// unit test for unconnected components App.js
import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { App } from '../components/App';
import { FETCH_USER } from '../actions/types';
require('../setupEnzyme');

test('should call fetch when mounted', () => {
  let mockFetch = jest.fn();

  const wrapper = mount(<FETCH_USER fetchUser={mockFetch} />);

  expect(wrapper).toBeDefined();
  expect(mockFetch.mock.calls[0]).toEqual();
});

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from '../App';
import mockStore from './mockStore';

describe('App', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <Provider store={mockStore}>
          <App />
        </Provider>
      )
    ).toMatchSnapshot()
  })
})

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import EditContactPage from '../EditContactPage';
import mockStore from './mockStore';
import mockContactList from './mockContactList';

describe('EditContactPage', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <Provider store={mockStore}>
          <BrowserRouter>
            <EditContactPage onEditContact={jest.fn()} contactList={mockContactList} />
          </BrowserRouter>
        </Provider>
      )
    ).toMatchSnapshot()
  })
})

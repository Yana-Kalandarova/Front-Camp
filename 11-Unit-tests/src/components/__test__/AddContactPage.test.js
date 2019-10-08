import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import AddContactPage from '../AddContactPage';
import mockStore from './mockStore';
import mockContactList from './mockContactList';

describe('AddContactPage', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <Provider store={mockStore}>
          <BrowserRouter>
            <AddContactPage onUpdateContact={jest.fn()} contactList={mockContactList} />
          </BrowserRouter>
        </Provider>
      )
    ).toMatchSnapshot()
  })
})

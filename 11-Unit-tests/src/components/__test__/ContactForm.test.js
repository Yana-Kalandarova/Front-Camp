import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import ContactForm from '../ContactForm';
import mockContactList from './mockContactList';

const props = {
  match: {
    params: {
      contactId: '1a2b3c',
    }
  }
}

describe('ContactForm', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <BrowserRouter>
          <ContactForm contactList={mockContactList} onUpdateContact={jest.fn()} {...props} />
        </BrowserRouter>
      )
    ).toMatchSnapshot()
  });
});

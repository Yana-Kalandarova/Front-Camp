import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ContactItem from '../ContactItem';
import mockContact from './mockContact';

describe('ContactItem', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <BrowserRouter>
          <ContactItem {...mockContact} onDeleteContact={jest.fn()}/>
        </BrowserRouter>
      )
    ).toMatchSnapshot()
  })
})

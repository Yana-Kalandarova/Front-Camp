import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <BrowserRouter>
          <ErrorMessage message={'mock message'} />
        </BrowserRouter>
      )
    ).toMatchSnapshot()
  })
})

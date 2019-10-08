import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ contactList: [], searchValue: '' })

export default store;

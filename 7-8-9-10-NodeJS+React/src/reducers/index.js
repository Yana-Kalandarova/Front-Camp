import { combineReducers } from 'redux';
import contactList from './contactList';
import searchValue from './searchValue';

export default combineReducers({ contactList, searchValue });

import axios from 'axios';
import {
  FETCH_CONTACT_LIST, SEARCH_CONTACT,
} from './types';
import { serverUrl } from '../../server/config/server';

export const fetchContactList = contactList => ({
  type: FETCH_CONTACT_LIST,
  contactList,
});

export const fetchContacts = () => dispatch => axios.get(serverUrl).then((res) => {
  dispatch(fetchContactList(res.data));
}, (err) => {
  console.log(`Error: ${err}`);
});

export const searchContact = searchValue => ({
  type: SEARCH_CONTACT,
  searchValue,
});

import axios from 'axios';
import {
  FETCH_CONTACT_LIST, SEARCH_CONTACT, ADD_CONTACT, DELETE_CONTACT,
} from './types';
import { serverUrl } from '../../server/config/server';

export const fetchContactList = contactList => ({
  type: FETCH_CONTACT_LIST,
  contactList,
});

export const fetchContacts = () => dispatch => axios
  .get(serverUrl).then((res) => {
    dispatch(fetchContactList(res.data));
  }, (err) => {
    console.log(`Error: ${err}`);
  });

export const searchContact = searchValue => ({
  type: SEARCH_CONTACT,
  searchValue,
});

export const addContactSuccess = data => ({
  type: ADD_CONTACT,
  payload: {
    _id: data._id,
    name: data.name,
    phoneNumber: data.phoneNumber,
  },
});

export const addContact = contact => dispatch => axios
  .post(`${serverUrl}/add-contact`, contact)
  .then((res) => {
    dispatch(addContactSuccess(res.data));
  }, (err) => {
    console.log(`Error: ${err}`);
  });

export const deleteContactSuccess = _id => ({
  type: DELETE_CONTACT,
  payload: {
    _id,
  },
});

export const deleteContact = contactId => dispatch => axios
  .delete(`${serverUrl}/delete-contact/${contactId}`)
  .then((res) => {
    dispatch(deleteContactSuccess(res.data));
  }, (err) => {
    console.log(`Error: ${err}`);
  });

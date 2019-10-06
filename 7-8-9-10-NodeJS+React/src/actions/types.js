export const FETCH_CONTACT_LIST = 'FETCH_CONTACT_LIST';
export const SEARCH_CONTACT = 'SEARCH_CONTACT';
// export const ADD_CONTACT = 'ADD_CONTACT';
// export const EDIT_CONTACT = 'EDIT_CONTACT';
// export const DELETE_CONTACT = 'DELETE_CONTACT';

export const deleteContact = id => ({
  type: 'DELETE_CONTACT',
  id,
});

export const addContact = contact => ({
  type: 'ADD_CONTACT',
  contact,
});

export const editContact = contact => ({
  type: 'EDIT_CONTACT',
  contact,
});

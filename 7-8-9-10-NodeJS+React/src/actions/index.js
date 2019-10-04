export const searchContact = searchValue => ({
  type: 'SEARCH_CONTACT',
  searchValue,
});

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

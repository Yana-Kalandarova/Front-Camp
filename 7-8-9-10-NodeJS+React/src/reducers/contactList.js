import { findIndexById } from '../utils/index';
import { FETCH_CONTACT_LIST } from '../actions/types';

const contactList = (list = [], action) => {
  switch (action.type) {
    case FETCH_CONTACT_LIST:
      return action.contactList;

    case 'DELETE_CONTACT':
    {
      const deletedIndex = findIndexById(list, action.id);

      return list
        .slice(0, deletedIndex)
        .concat(list.slice(deletedIndex + 1));
    }

    case 'ADD_CONTACT':
    {
      return [
        ...list,
        action.contact,
      ];
    }

    case 'EDIT_CONTACT':
    {
      const editedIndex = findIndexById(list, action.contact.id);

      return list
        .slice(0, editedIndex)
        .concat([action.contact])
        .concat(list.slice(editedIndex + 1));
    }

    default:
      return list;
  }
};

export default contactList;

import { findIndexById } from '../utils/index';
import {
  FETCH_CONTACT_LIST, ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT,
} from '../actions/types';

const contactList = (list = [], action) => {
  switch (action.type) {
    case FETCH_CONTACT_LIST:
      return action.contactList;

    case ADD_CONTACT:
    {
      return [
        ...list,
        action.payload,
      ];
    }

    case EDIT_CONTACT:
    {
      const editedIndex = findIndexById(list, action.payload._id);

      return list
        .slice(0, editedIndex)
        .concat([action.payload])
        .concat(list.slice(editedIndex + 1));
    }

    case DELETE_CONTACT:
    {
      const deletedIndex = findIndexById(list, action.payload._id);

      return list
        .slice(0, deletedIndex)
        .concat(list.slice(deletedIndex + 1));
    }

    default:
      return list;
  }
};

export default contactList;

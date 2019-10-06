import { findIndexById } from '../utils/index';
import { FETCH_CONTACT_LIST, ADD_CONTACT } from '../actions/types';

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

    case 'DELETE_CONTACT':
    {
      const deletedIndex = findIndexById(list, action._id);

      return list
        .slice(0, deletedIndex)
        .concat(list.slice(deletedIndex + 1));
    }

    case 'EDIT_CONTACT':
    {
      const editedIndex = findIndexById(list, action.contact._id);

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

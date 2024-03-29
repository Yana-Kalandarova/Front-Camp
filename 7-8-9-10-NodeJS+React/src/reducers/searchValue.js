import { SEARCH_CONTACT } from '../actions/types';

const searchValue = (state = '', action) => {
  switch (action.type) {
    case SEARCH_CONTACT:
      return action.searchValue;
    default:
      return state;
  }
};

export default searchValue;

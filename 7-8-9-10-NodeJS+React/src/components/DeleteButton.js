import React from 'react';
import PropTypes from 'prop-types';

import deleteIcon from '../assets/delete-icon.svg';

const propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contactId: PropTypes.number.isRequired,
};

const DeleteButton = ({ onDeleteContact, contactId }) => {
  const handleDeleteButton = () => {
    onDeleteContact(contactId);
  };

  return (
    <button className="contact_btn-delete" type="button" onClick={handleDeleteButton}>
      <svg><use xlinkHref={`#${deleteIcon.id}`} /></svg>
    </button>
  );
};

DeleteButton.propTypes = propTypes;

export default DeleteButton;

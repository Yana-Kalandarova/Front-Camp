import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import editIcon from '../assets/edit-icon.svg';

const propTypes = {
  contactId: PropTypes.string.isRequired,
};

const EditButton = ({ contactId }) => (
  <Link to={`/edit-contact/${contactId}`} className="contact_btn-edit">
    <svg><use xlinkHref={`#${editIcon.id}`} /></svg>
  </Link>
);

EditButton.propTypes = propTypes;

export default EditButton;

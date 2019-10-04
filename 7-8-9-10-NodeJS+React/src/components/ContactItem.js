import React from 'react';
import PropTypes from 'prop-types';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

const ContactItem = ({
  name, phoneNumber, id, onDeleteContact,
}) => (
  <li className="contact_list-item">
    <dl>
      <dt>{name}</dt>
      <dd>{phoneNumber}</dd>
    </dl>
    <EditButton contactId={id} />
    <DeleteButton onDeleteContact={onDeleteContact} contactId={id} />
  </li>
);

ContactItem.propTypes = propTypes;

export default ContactItem;

import React from 'react';
import PropTypes from 'prop-types';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

const ContactItem = ({
  name, phoneNumber, _id, onDeleteContact,
}) => (
  <li className="contact_list-item">
    <dl>
      <dt>{name}</dt>
      <dd>{phoneNumber}</dd>
    </dl>
    <EditButton contactId={_id} />
    <DeleteButton onDeleteContact={onDeleteContact} contactId={_id} />
  </li>
);

ContactItem.propTypes = propTypes;

export default ContactItem;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContact } from '../actions/types';
import ContactItem from './ContactItem';
import { filterList } from '../utils/index';

const propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
  })).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

const ContactList = ({ contactList, onDeleteContact }) => (
  <ul className="contact_list">
    {
      contactList.map(contact => <ContactItem {...contact} key={contact.id} onDeleteContact={onDeleteContact} />)
    }
  </ul>
);

ContactList.propTypes = propTypes;

const mapStateToProps = state => ({
  contactList: filterList(state.contactList, state.searchValue),
});

export default connect(mapStateToProps, { onDeleteContact: deleteContact })(ContactList);

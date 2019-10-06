import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from './ContactForm';
import { addContact } from '../actions';

const propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
  })).isRequired,
  onAddContact: PropTypes.func.isRequired,
};

const AddContactPage = ({ contactList, onAddContact }) => (
  <div className="view_wrap">
    <h1 className="view_title">Add Contact</h1>
    <ContactForm onUpdateContact={onAddContact} contactList={contactList} />
  </div>
);

AddContactPage.propTypes = propTypes;

const mapStateToProps = state => ({
  contactList: state.contactList,
});

export default connect(mapStateToProps, { onAddContact: addContact })(AddContactPage);

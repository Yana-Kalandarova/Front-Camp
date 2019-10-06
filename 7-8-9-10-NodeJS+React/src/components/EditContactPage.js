import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from './ContactForm';
import { editContact } from '../actions';

const propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
  })).isRequired,
  onEditContact: PropTypes.func.isRequired,
};

const EditContactPage = ({ contactList, onEditContact }) => (
  <div className="view_wrap">
    <h1 className="view_title">Edit Contact</h1>
    <ContactForm onUpdateContact={onEditContact} contactList={contactList} />
  </div>
);

EditContactPage.propTypes = propTypes;

const mapStateToProps = state => ({
  contactList: state.contactList,
});

export default connect(mapStateToProps, { onEditContact: editContact })(EditContactPage);

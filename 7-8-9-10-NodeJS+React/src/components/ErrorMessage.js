import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  message: PropTypes.string.isRequired,
};

const ErrorMessage = ({ message }) => (message ? <p className="contact_form-error">{message}</p> : '');

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;

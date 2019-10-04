import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import ContactList from './ContactList';

const ContactListPage = () => (
  <div className="view_wrap">
    <h1 className="view_title">Contact List</h1>
    <SearchBar />
    <ContactList />
    <div className="contact_btn-wrap">
      <Link to="/add-contact" className="contact_btn-add">Add Contact</Link>
    </div>
  </div>
);

export default ContactListPage;

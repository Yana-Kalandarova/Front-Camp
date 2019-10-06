import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ContactListPage from './ContactListPage';
import AddContactPage from './AddContactPage';
import EditContactPage from './EditContactPage';

import '../styles/app.scss';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={ContactListPage}
      />
      <Route
        path="/add-contact"
        component={AddContactPage}
      />
      <Route
        path="/edit-contact/:contactId"
        component={EditContactPage}
      />
    </Switch>
  </BrowserRouter>
);

export default App;

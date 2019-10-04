const router = require('express').Router();
const Contact = require('../models/contact.model');

router.route('/').get((req, res) => {
  Contact.find()
    .then((contacts) => {
      res.json(contacts);
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add-contact').post((req, res) => {
  const { name, phoneNumber } = req.body;

  const newUser = new Contact({ name, phoneNumber });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/edit-contact/:contactId').put((req, res) => {
  res.send('Contact has been updated');
});

router.route('/delete-contact/:contactId').delete((req, res) => {
  res.send('Contact has been deleted');
});


module.exports = router;

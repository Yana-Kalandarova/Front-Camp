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
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/edit-contact/:contactId').put((req, res) => {
  Contact.findByIdAndUpdate({
    _id: req.params.contactId,
  }, {
    name: req.body.name, phoneNumber: req.body.phoneNumber,
  }, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(req.params.contactId);
    }
  });
});

router.route('/delete-contact/:contactId').delete((req, res) => {
  Contact.findByIdAndRemove({ _id: req.params.contactId }, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(req.params.contactId);
    }
  });
});


module.exports = router;

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const serverConfig = require('./config/server');
const contactsRouter = require('./routes/contacts');

const { port, dbUrl } = serverConfig;
const app = express();

app.use(cors());
app.use(express.json());

app
  .get('/', contactsRouter)
  .post('/add-contact', contactsRouter)
  .put('/edit-contact/:contactId', contactsRouter)
  .delete('/delete-contact/:contactId', contactsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const connectDb = () => mongoose.connect(dbUrl, { useNewUrlParser: true });

connectDb().then(() => {
  console.log('Connected to MongoDB successfully!');
}, (err) => {
  console.error(err);
});

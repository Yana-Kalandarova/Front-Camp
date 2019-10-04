const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const serverConfig = require('./config/server');

const { port, dbUrl } = serverConfig;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const connectDb = () => mongoose.connect(dbUrl, { useNewUrlParser: true });

connectDb().then(() => {
  console.log('Connected to MongoDB successfully!');
}, (err) => {
  console.error(err);
});

import mongoose from 'mongoose';
import Contact from './contact.model';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL);
const models = { Contact };

module.exports = {
  connectDb, models,
}

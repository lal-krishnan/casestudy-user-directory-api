import mongoose from 'mongoose';
import { _DB_CONNECTION_STRING } from './constants';
import User from '../models/UserModel';
const connectDb = () => {
  return mongoose.connect(_DB_CONNECTION_STRING);
};
const models = { User };
export { connectDb };
export default models;
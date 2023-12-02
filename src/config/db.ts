import mongoose from 'mongoose';
import User from '../models/UserModel';
const connectDb = (_DB_CONNECTION_STRING:string) => {
  console.log("_DB_CONNECTION_STRING_DB_CONNECTION_STRING",_DB_CONNECTION_STRING)
  return mongoose.connect(_DB_CONNECTION_STRING);
};
const models = { User };
export { connectDb };
export default models;
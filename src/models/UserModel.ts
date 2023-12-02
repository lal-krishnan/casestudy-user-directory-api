import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../types/User';
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const UserModel = mongoose.model<User>('userDirectory', userSchema);
export default UserModel;
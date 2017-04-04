import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  name: String
});

const User = mongoose.model('User', UserSchema);

/* Custom handlers go here */

export default User;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: Map,
  email: String,
  isAdmin: Boolean,
  phone: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,    
  },
});

export default mongoose.model('User', userSchema);

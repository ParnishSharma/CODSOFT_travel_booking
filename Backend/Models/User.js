
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // Add any other properties relevant to your application's user data
});

const User = mongoose.model('User', userSchema);

module.exports = User;

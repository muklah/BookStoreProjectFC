// Dependency

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: [true, 'Email Is Required']
    },
    password: {
      type: String,
      required: [true, 'Password Is Required']
    },
    type: {
      type: String,
      required: [true, 'Type Is Required']
    },
  
  });

module.exports = mongoose.model('User', userSchema);
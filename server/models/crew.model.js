const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
    // unique: true
  },
  img_url: {
    type: String,
  },
  occupation: {
    type: String,
  },
  unavailableFrom: {
    type: Number,
  },
  unavailableTo: {
    type: Number,
  },
  p_email: {
    type: String,
  },
  s_email: {
    type: String,
  },
  p_phone: {
    type: String,
  },
  s_phone: {
    type: String,
  },
  licence: {
    type: String,
  },
  expiry: {
    type: String,
  },
  user_id: {
    type: String,
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('crews', DbSchema);

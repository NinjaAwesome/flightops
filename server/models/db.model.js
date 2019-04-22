const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

  registration: {
    type: String,
    required: true
    // unique: true
  },
  tow: {
    type: Number
  },
  fuel: {
    type: Number
  },
  pax: {
    type: Number
  },
  cargo: {
    type: Number
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('db', DbSchema);

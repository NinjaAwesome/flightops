const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true
    // unique: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('mail-template', DbSchema);

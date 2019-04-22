const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

  registration: {
    type: String,
    required: true
    // unique: true
  },
  aircraftId: {
    type: String,
    required: true
    // unique: true
  },
  img_url: {
    type: String,
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
  },
  icao24: {
    type: String
  },
  base: {
    type: String
  }
}, {
    versionKey: false
  });


module.exports = mongoose.model('aircrafts', DbSchema);

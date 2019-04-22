const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

  reference_id: {
    type: String,
  },
  ops_crew: {
    type: String
  },
  pic_crew: {
    type: String
  },
  fo_crew: {
    type: String
  },
  ops_crew_name: {
    type: String
  },
  pic_crew_name: {
    type: String
  },
  fo_crew_name: {
    type: String
  },
  aircraft: {
    type: Number
  },
  departure_airport: {
    type: String
  },
  arrival_airport: {
    type: String
  },
  departure_time: {
    type: Number
  },
  handler: {
    type: String
  },
  dangerous: {
    type: String
  },
  type: {
    type: String
  },
  pax: {
    type: String
  },
  cargo: {
    type: String
  },
  liveLeg: {
    type: String
  },
  positionFrom: {
    type: String
  },
  positionTo: {
    type: String
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('flight', DbSchema);

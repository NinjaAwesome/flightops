const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({
  reference_id: {
    type: String,
  },
  route: {
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
  handler: {
    type: String
  },
  dangerous: {
    type: String
  },
  paxCargo: {
    type: String
  },
  pax: {
    type: String
  },
  cargo: {
    type: String
  },
  type: {
    type: String
  },
  arrivaltime: {
    type: Number
  },
  departuretime: {
    type: Number
  },
  fuel: {
    type: Number
  },
  distance: {
    type: Number
  },
  fplan: {
    type: Object
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('route', DbSchema);

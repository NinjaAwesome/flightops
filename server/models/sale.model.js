const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

  company_name: {
    type: String,
    // required: true
    // unique: true
  },
  contact_name: {
    type: String,
    // unique: true
  },
  contact_phone: {
    type: String
  },
  contact_email: {
    type: String
  },
  weight: {
    type: String
  },
  dangerous: {
    type: String
  },
  description: {
    type: String
  },
  instructions: {
    type: String
  },
  origin_airport: {
    type: String
  },
  destination_airport: {
    type: String
  },
  departure: {
    type: Number
  },
  reference_id: {
    type: String
  },
  estimated_cost: {
    type: String
  },
  price_charged: {
    type: String
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('sales', DbSchema);

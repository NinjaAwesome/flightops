const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/sale.model');

const dbSchema = Joi.object({
  company_name: Joi.string().required(),
  contact_name: Joi.string().required(),
  contact_phone: Joi.string().allow('').optional(),
  contact_email: Joi.string().allow('').optional(),
  weight: Joi.string().allow('').optional(),
  dangerous: Joi.string().allow('').optional(),
  description: Joi.string().allow('').optional(),
  instructions: Joi.string().allow('').optional(),
  origin_airport: Joi.string().allow('').optional(),
  destination_airport: Joi.string().allow('').optional(),
  departure: Joi.number().allow('').optional(),
  reference_id: Joi.string().allow('').optional(),
  estimated_cost: Joi.string().allow('').optional(),
  price_charged: Joi.string().allow('').optional(),
})


module.exports = {
  insert,
  fetch
}

async function insert(aircraft) {
  aircraft = await Joi.validate(aircraft, dbSchema, { abortEarly: false, convert: true });
  return await new Db(aircraft).save();
}
function fetch() {
  let aircrafts = '';
  Db.find({}, function (err, aircrafts) {
    if (err) {
      console.log(err);
    } else {
      return aircrafts;
    }
  })
}

const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/aircraft.model');

const dbSchema = Joi.object({
  img_url: Joi.string().required(),
  aircraftId: Joi.string().required(),
  registration: Joi.string().required(),
  tow: Joi.number().allow('').optional(),
  fuel: Joi.number().allow('').optional(),
  pax: Joi.number().allow('').optional(),
  cargo: Joi.number().allow('').optional(),
  icao24: Joi.string().allow('').optional(),
  base: Joi.string().allow('').optional()
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

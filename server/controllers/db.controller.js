const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/db.model');

const dbSchema = Joi.object({
  registration: Joi.string().required(),
  tow: Joi.number().allow('').optional(),
  fuel: Joi.number().allow('').optional(),
  pax: Joi.number().allow('').optional(),
  cargo: Joi.number().allow('').optional()
})


module.exports = {
  insert
}

async function insert(aircraft) {
  aircraft = await Joi.validate(aircraft, dbSchema, { abortEarly: false, convert: true });
  return await new Db(aircraft).save();
}

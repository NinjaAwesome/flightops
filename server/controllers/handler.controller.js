const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/handler.model');

const dbSchema = Joi.object({
  name: Joi.string().required(),
  iata_code: Joi.string().required(),
  logo: Joi.string().allow('').optional(),
  phone_primary: Joi.string().allow('').optional(),
  phone_secondary: Joi.string().allow('').optional(),
  email_primary: Joi.string().allow('').optional(),
  email_secondary: Joi.string().allow('').optional(),
  monday_open: Joi.string().allow('').optional(),
  monday_close: Joi.string().allow('').optional(),
  tuesday_open: Joi.string().allow('').optional(),
  tuesday_close: Joi.string().allow('').optional(),
  wednesday_open: Joi.string().allow('').optional(),
  wednesday_close: Joi.string().allow('').optional(),
  thursday_open: Joi.string().allow('').optional(),
  thursday_close: Joi.string().allow('').optional(),
  friday_open: Joi.string().allow('').optional(),
  friday_close: Joi.string().allow('').optional(),
  saturday_open: Joi.string().allow('').optional(),
  saturday_close: Joi.string().allow('').optional(),
  sunday_open: Joi.string().allow('').optional(),
  sunday_close: Joi.string().allow('').optional()
})


module.exports = {
  insert,
  fetch
}

async function insert(handler) {
  handler = await Joi.validate(handler, dbSchema, { abortEarly: false, convert: true });
  return await new Db(handler).save();
}
function fetch() {
  let handlers = '';
  Db.find({}, function (err, handlers) {
    if (err) {
      console.log(err);
    } else {
      return handlers;
    }
  })
}

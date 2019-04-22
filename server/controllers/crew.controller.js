const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/crew.model');

const dbSchema = Joi.object({
  img_url: Joi.string().required(),
  name: Joi.string().required(),
  occupation: Joi.string().allow('').optional(),
  unavailableFrom: Joi.number().allow('').optional(),
  unavailableTo: Joi.number().allow('').optional(),
  p_email: Joi.string().allow('').optional(),
  s_email: Joi.string().allow('').optional(),
  p_phone: Joi.string().allow('').optional(),
  s_phone: Joi.string().allow('').optional(),
  licence: Joi.string().allow('').optional(),
  expiry: Joi.string().allow('').optional(),
  user_id: Joi.string().allow('').optional(),
})


module.exports = {
  insert,
  fetch
}

async function insert(crew) {
  crew = await Joi.validate(crew, dbSchema, { abortEarly: false, convert: true });
  return await new Db(crew).save();
}
function fetch() {
  let crews = '';
  Db.find({}, function (err, crews) {
    if (err) {
      console.log(err);
    } else {
      return crews;
    }
  })
}

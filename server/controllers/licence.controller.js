const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/licence.model');

const dbSchema = Joi.object({
  crew_id: Joi.string().required(),
  licence: Joi.string().required(),
  expiry: Joi.string().allow('').optional(),
})


module.exports = {
  insert,
  fetch
}

async function insert(licence) {
  licence = await Joi.validate(licence, dbSchema, { abortEarly: false, convert: true });
  return await new Db(licence).save();
}
function fetch() {
  let licences = '';
  Db.find({}, function (err, licences) {
    if (err) {
      console.log(err);
    } else {
      return licences;
    }
  })
}

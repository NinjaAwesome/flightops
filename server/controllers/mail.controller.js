const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/mail.model');

const dbSchema = Joi.object({
  type: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().allow('').optional(),
})


module.exports = {
  insert,
  fetch
}

async function insert(mail) {
  mail = await Joi.validate(mail, dbSchema, { abortEarly: false, convert: true });
  return await new Db(mail).save();
}
function fetch() {
  let mails = '';
  Db.find({}, function (err, mails) {
    if (err) {
      console.log(err);
    } else {
      return mails;
    }
  })
}

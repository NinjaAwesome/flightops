const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/flight.model');

const dbSchema = Joi.object({
    reference_id: Joi.string().required(),
    ops_crew: Joi.string().allow('').optional(),
    pic_crew: Joi.string().allow('').optional(),
    fo_crew: Joi.string().allow('').optional(),
    ops_crew_name: Joi.string().allow('').optional(),
    pic_crew_name: Joi.string().allow('').optional(),
    fo_crew_name: Joi.string().allow('').optional(),
    aircraft: Joi.number().allow('').optional(),
    departure_airport: Joi.string().allow('').optional(),
    arrival_airport: Joi.string().allow('').optional(),
    departure_time: Joi.number().allow('').optional(),
    handler: Joi.string().allow('').optional(),
    dangerous: Joi.string().allow('').optional(),
    type: Joi.string().allow('').optional(),
    pax: Joi.string().allow('').optional(),
    cargo: Joi.string().allow('').optional(),
    liveLeg: Joi.string().allow('').optional(),
    positionFrom: Joi.string().allow('').optional(),
    positionTo: Joi.string().allow('').optional()
})


module.exports = {
    insert,
    fetch
}

async function insert(flight) {
    flight = await Joi.validate(flight, dbSchema, { abortEarly: false, convert: true });
    return await new Db(flight).save();
}
function fetch() {
    let flights = '';
    Db.find({}, function (err, flights) {
        if (err) {
            console.log(err);
        } else {
            return flights;
        }
    })
}

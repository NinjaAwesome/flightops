const bcrypt = require('bcrypt');
const Joi = require('joi');
const Db = require('../models/route.model');

const dbSchema = Joi.object({
    reference_id: Joi.string().required(),
    route: Joi.string().allow('').optional(),
    ops_crew: Joi.string().allow('').optional(),
    pic_crew: Joi.string().allow('').optional(),
    fo_crew: Joi.string().allow('').optional(),
    ops_crew_name: Joi.string().allow('').optional(),
    pic_crew_name: Joi.string().allow('').optional(),
    fo_crew_name: Joi.string().allow('').optional(),
    aircraft: Joi.number().allow('').optional(),
    departure_airport: Joi.string().allow('').optional(),
    arrival_airport: Joi.string().allow('').optional(),
    handler: Joi.string().allow('').optional(),
    dangerous: Joi.string().allow('').optional(),
    paxCargo: Joi.string().allow('').optional(),
    pax: Joi.string().allow('').optional(),
    cargo: Joi.string().allow('').optional(),
    type: Joi.string().required(),
    arrivaltime: Joi.number().required(),
    departuretime: Joi.number().required(),
    fuel: Joi.number().required(),
    distance: Joi.number().required(),
    fplan: Joi.object().allow('').optional(),
})


module.exports = {
    insert,
    fetch
}

async function insert(route) {
    route = await Joi.validate(route, dbSchema, { abortEarly: false, convert: true });
    return await new Db(route).save();
}
function fetch() {
    let routes = '';
    Db.find({}, function (err, routes) {
        if (err) {
            console.log(err);
        } else {
            return routes;
        }
    })
}

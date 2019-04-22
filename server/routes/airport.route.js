const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const airportCtrl = require('../controllers/airport.controller');
const Airport = require('../models/airport.model');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Airport.find({}, function (err, airports) {
        if (err) {
            console.log(err);
        } else {
            res.json(airports);
        }
    })
});
router.get('/fetch/:iata_code', function (req, res) {
    Airport.find({ iata_code: req.params.iata_code }, function (err, airport) {
        if (err) {
            console.log(err);
        } else {
            res.json(airport);
        }
    })
});



async function insert(req, res) {
    let airport = await airportCtrl.insert(req.body);
    res.json(airport);
}
async function fetch(req, res) {
    let airport = await airportCtrl.fetch();
    res.json(airport);
}

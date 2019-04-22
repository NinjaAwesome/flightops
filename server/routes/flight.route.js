const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const flightCtrl = require('../controllers/flight.controller');
const Flight = require('../models/flight.model');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Flight.find({}, function (err, flights) {
        if (err) {
            console.log(err);
        } else {
            res.json(flights);
        }
    })
});
router.get('/fetch/:id', function (req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        if (err) {
            console.log(err);
        } else {
            res.json(flight);
        }
    })
});



async function insert(req, res) {
    let flight = await flightCtrl.insert(req.body);
    res.json(flight);
}
async function fetch(req, res) {
    let flight = await flightCtrl.fetch();
    res.json(flight);
}

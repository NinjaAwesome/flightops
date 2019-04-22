const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const routeCtrl = require('../controllers/route.controller');
const Route = require('../models/route.model');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Route.find({}, function (err, routes) {
        if (err) {
            console.log(err);
        } else {
            res.json(routes);
        }
    })
});
router.get('/fetch/:id', function (req, res) {
    Route.findById(req.params.id, function (err, route) {
        if (err) {
            console.log(err);
        } else {
            res.json(route);
        }
    })
});
router.get('/fetchAircraft/:aircraftid', function (req, res) {
    Route.find({ aircraft: req.params.aircraftid }, function (err, route) {
        if (err) {
            console.log(err);
        } else {
            res.json(route);
        }
    })
});
router.get('/fetchOPS/:ops', function (req, res) {
    Route.find({ ops_crew: req.params.ops }, function (err, route) {
        if (err) {
            console.log(err);
        } else {
            res.json(route);
        }
    })
});
router.get('/fetchPIC/:pic', function (req, res) {
    Route.find({ pic_crew: req.params.pic }, function (err, route) {
        if (err) {
            console.log(err);
        } else {
            res.json(route);
        }
    })
});
router.get('/fetchFO/:fo', function (req, res) {
    Route.find({ fo_crew: req.params.fo }, function (err, route) {
        if (err) {
            console.log(err);
        } else {
            res.json(route);
        }
    })
});



async function insert(req, res) {
    let route = await routeCtrl.insert(req.body);
    res.json(route);
}
async function fetch(req, res) {
    let route = await routeCtrl.fetch();
    res.json(route);
}

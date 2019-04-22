const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const handlerCtrl = require('../controllers/handler.controller');
const Handler = require('../models/handler.model');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Handler.find({}, function (err, handlers) {
        if (err) {
            console.log(err);
        } else {
            res.json(handlers);
        }
    })
});
router.get('/fetch/:airport', function (req, res) {
    Handler.find({ iata_code: req.params.airport }, function (err, handlers) {
        if (err) {
            console.log(err);
        } else {
            res.json(handlers);
        }
    })
});
router.get('/fetchDetails/:handler', function (req, res) {
    Handler.findById(req.params.handler, function (err, handlers) {
        if (err) {
            console.log(err);
        } else {
            res.json(handlers);
        }
    })
});



async function insert(req, res) {
    let handler = await handlerCtrl.insert(req.body);
    res.json(handler);
}
async function fetch(req, res) {
    let handler = await handlerCtrl.fetch();
    res.json(handler);
}

const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const licenceCtrl = require('../controllers/licence.controller');
const Licence = require('../models/licence.model');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Licence.find({}, function (err, licences) {
        if (err) {
            console.log(err);
        } else {
            res.json(licences);
        }
    })
});
router.get('/fetch/:crew_id', function (req, res) {
    Licence.find({ crew_id: req.params.crew_id }, function (err, licence) {
        if (err) {
            console.log(err);
        } else {
            res.json(licence);
        }
    })
});



async function insert(req, res) {
    let licence = await licenceCtrl.insert(req.body);
    res.json(licence);
}
async function fetch(req, res) {
    let licence = await licenceCtrl.fetch();
    res.json(licence);
}

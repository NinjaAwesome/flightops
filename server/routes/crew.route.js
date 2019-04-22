const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const crewCtrl = require('../controllers/crew.controller');
const Crew = require('../models/crew.model');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Crew.find({}, function (err, crews) {
        if (err) {
            console.log(err);
        } else {
            res.json(crews);
        }
    })
});
router.get('/fetch/:id', function (req, res) {
    Crew.findById(req.params.id, function (err, crew) {
        if (err) {
            console.log(err);
        } else {
            res.json(crew);
        }
    })
});
router.get('/fetchUser/:id', function (req, res) {
    Crew.find({user_id: req.params.id}, function (err, crew) {
        if (err) {
            console.log(err);
        } else {
            res.json(crew);
        }
    })
});
router.get('/fetchType/:occupation', function (req, res) {
    Crew.find({ occupation: req.params.occupation }, function (err, crew) {
        if (err) {
            console.log(err);
        } else {
            res.json(crew);
        }
    })
});
router.put('/update/:id', function (req, res) {
    Crew.findOne({ _id: req.params.id }, function (err, doc) {
        doc.unavailableFrom = req.body.unavailableFrom;
        doc.unavailableTo = req.body.unavailableTo;
        // // doc.visits.$inc();
        doc.save();
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});



async function insert(req, res) {
    let crew = await crewCtrl.insert(req.body);
    res.json(crew);
}
async function fetch(req, res) {
    let crew = await crewCtrl.fetch();
    res.json(crew);
}

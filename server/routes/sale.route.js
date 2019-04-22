const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const saleCtrl = require('../controllers/sale.controller');
const Sale = require('../models/sale.model');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Sale.find({}, function (err, sales) {
        if (err) {
            console.log(err);
        } else {
            res.json(sales);
        }
    })
});
router.get('/fetch/:id', function (req, res) {
    Sale.findById(req.params.id, function (err, sale) {
        if (err) {
            console.log(err);
        } else {
            res.json(sale);
        }
    })
});



async function insert(req, res) {
    let sale = await saleCtrl.insert(req.body);
    res.json(sale);
}
async function fetch(req, res) {
    let sale = await saleCtrl.fetch();
    res.json(sale);
}

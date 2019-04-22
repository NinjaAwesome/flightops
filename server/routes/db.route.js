const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const dbCtrl = require('../controllers/db.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
var fs = require('fs');
var csv = require('csv-parser');

const router = express.Router();
module.exports = router;

router.get('/db', asyncHandler(db));



async function db(req, res) {
    const csvFilePath = 'convertcsv.csv'
    const csv = require('csvtojson')
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            var i;
            for (i = 0; i < jsonObj.length; i++) {
                console.log(jsonObj[i])
                dbCtrl.insert(jsonObj[i]);

            }
            res.send('done');
            /**
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */
        })
    // const results = [];
    // fs.createReadStream('convertcsv.csv')
    //     .pipe(csv({ separator: ',' }))
    //     .on('data', results.push)
    //     .on('end', () => {
    //         console.log(results);
    //         // [
    //         //   { NAME: 'Daffy Duck', AGE: 24 },
    //         //   { NAME: 'Bugs Bunny', AGE: 22 }
    //         // ]
    //     });
    // fs.createReadStream("convertcsv.csv")
    //     .pipe(csv())
    //     .on('data', results.push)
    //     .on('end', function () {
    //         //do something wiht csvData
    //         // console.log(csvData);

    //         res.send(results);
    //     });
    // var det = {
    //     image_url: 'img',
    //     registration: csvrow[1],
    //     mtow: 5000,
    //     max_fuel: 3000
    // }
    // dbCtrl.insert(det);
}

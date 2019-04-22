const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const aircraftCtrl = require('../controllers/aircraft.controller');
const Aircraft = require('../models/aircraft.model');
const axios = require('axios');
var fs = require('fs');
var path = require('path');
axios.post('https://api.autorouter.aero/v1.0/oauth2/token', {
    grant_type: 'client_credentials',
    client_id: 'kininteractivesolutions@gmail.com',
    client_secret: 'Test123'
})
    .then(response => {
        // return response.data;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    })
    .catch(error => {
        console.log(error);
    });
const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Aircraft.find({}, function (err, aircrafts) {
        if (err) {
            console.log(err);
        } else {
            res.json(aircrafts);
        }
    })
});
router.get('/fetch/:id', function (req, res) {
    Aircraft.findById(req.params.id, function (err, aircraft) {
        if (err) {
            console.log(err);
        } else {
            res.json(aircraft);
        }
    })
});
router.post('/createRoute', function (req, res) {
    axios.post('https://api.autorouter.aero/v1.0/router', req.body)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});
router.get('/longpoll/:route', function (req, res) {
    axios.put('https://api.autorouter.aero/v1.0/router/' + req.params.route + '/longpoll', {
        aircraftid: 0,
        departuretime: "2019-04-21T08:05:31.770Z",
        departure: "EDDS",
        destination: "EDWI"
    })
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});
router.get('/getFplan/:route', function (req, res) {
    axios.get('https://api.autorouter.aero/v1.0/flightplan/' + req.params.route)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});
router.get('/getBriefing/:route', function (req, res) {
    axios.get('https://api.autorouter.aero/v1.0/flightplan/' + req.params.route + '/briefing?navlog&mb&distances&climb&metartaf&gramet&isobraic&skewt&raobs&sigwx&mslp&temsi&atcbriefing&notam&icaofpl&atcharges', {
        headers: {
            'Content-Type': 'application/pdf'
        },
        responseType: 'arraybuffer'
    })
        .then(response => {
            res.json("briefing pack generated!");
            fs.writeFile(path.join(__dirname + '/briefing/' + req.params.route + '.pdf'), response.data, 'binary', (err) => {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        })
        .catch(error => {
            console.log(error);
        });
});
router.get('/downloadBriefing/:route', function (req, res) {
    fs.access(path.join(__dirname + '/briefing/' + req.params.route + '.pdf'), fs.F_OK, (err) => {
        if (err) {
            console.log(err)
            return
        }
        res.sendFile(path.join(__dirname + '/briefing/' + req.params.route + '.pdf'))

    })

});
router.get('/getNOTAM/:airport', function (req, res) {
    axios.get('https://api.autorouter.aero/v1.0/notam?itemas=["' + req.params.airport + '"]&offset=0&limit=10')
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

function getToken() {
    axios.post('https://api.autorouter.aero/v1.0/oauth2/token', {
        grant_type: 'client_credentials',
        client_id: 'kininteractivesolutions@gmail.com',
        client_secret: 'Test123'
    })
        .then(response => {
            // return response.data;
            return response.data.access_token;
        })
        .catch(error => {
            console.log(error);
        });
}


async function insert(req, res) {
    let aircraft = await aircraftCtrl.insert(req.body);
    res.json(aircraft);
}
async function fetch(req, res) {
    let aircraft = await aircraftCtrl.fetch();
    res.json(aircraft);
}

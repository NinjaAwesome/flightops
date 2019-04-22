const express = require('express');
// const passport = require('passport');
const asyncHandler = require('express-async-handler');
const mailCtrl = require('../controllers/mail.controller');
const Mail = require('../models/mail.model');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(asyncHandler(insert));
router.get('/fetchs', asyncHandler(fetch));
router.get('/fetch', function (req, res) {
    Mail.find({}, function (err, mails) {
        if (err) {
            console.log(err);
        } else {
            res.json(mails);
        }
    })
});
router.get('/fetch/:id', function (req, res) {
    Mail.findById(req.params.id, function (err, mail) {
        if (err) {
            console.log(err);
        } else {
            res.json(mail);
        }
    })
});
router.get('/fetchType/:occupation', function (req, res) {
    Mail.find({ occupation: req.params.occupation }, function (err, mail) {
        if (err) {
            console.log(err);
        } else {
            res.json(mail);
        }
    })
});
router.put('/update/:id', function (req, res) {
    Mail.findOne({ _id: req.params.id }, function (err, doc) {
        doc.subject = req.body.subject;
        doc.message = req.body.message;
        // // doc.visits.$inc();
        doc.save();
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});
router.post('/send-mail', function (req, res) {
   
var options = {
    auth: {
      api_user: 'tife',
      api_key: 'n3xus123$'
    }
  }
  
  var client = nodemailer.createTransport(sgTransport(options));
      
      var mailOptions = {
        from: 'mhayeor@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message
      };
      
      client.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.json(error)
        } else {
            res.json(info)
          console.log('Email sent: ' + info.response);
        }
      });
});



async function insert(req, res) {
    let mail = await mailCtrl.insert(req.body);
    res.json(mail);
}
async function fetch(req, res) {
    let mail = await mailCtrl.fetch();
    res.json(mail);
}

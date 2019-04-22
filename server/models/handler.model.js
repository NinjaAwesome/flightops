const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
        // unique: true
    },
    iata_code: {
        type: String,
        // unique: true
    },
    logo: {
        type: String
    },
    phone_primary: {
        type: String
    },
    phone_secondary: {
        type: String
    },
    email_primary: {
        type: String
    },
    email_secondary: {
        type: String
    },
    monday_open: {
        type: String
    },
    monday_close: {
        type: String
    },
    tuesday_open: {
        type: String
    },
    tuesday_close: {
        type: String
    },
    wednesday_open: {
        type: String
    },
    wednesday_close: {
        type: String
    },
    thursday_open: {
        type: String
    },
    thursday_close: {
        type: String
    },
    friday_open: {
        type: String
    },
    friday_close: {
        type: String
    },
    saturday_open: {
        type: String
    },
    saturday_close: {
        type: String
    },
    sunday_open: {
        type: String
    },
    sunday_close: {
        type: String
    },
}, {
        versionKey: false
    });


module.exports = mongoose.model('handlers', DbSchema);

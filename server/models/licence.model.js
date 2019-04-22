const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

    crew_id: {
        type: String,
        required: true
    },
    licence: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
    }
}, {
        versionKey: false
    });


module.exports = mongoose.model('licences', DbSchema);

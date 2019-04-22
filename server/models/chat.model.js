const mongoose = require('mongoose');

const DbSchema = new mongoose.Schema({

    room: String,
    email: String,
    message: String,
    updated_at: { type: Date, default: Date.now },
}, {
        versionKey: false
    });


module.exports = mongoose.model('chat', DbSchema);

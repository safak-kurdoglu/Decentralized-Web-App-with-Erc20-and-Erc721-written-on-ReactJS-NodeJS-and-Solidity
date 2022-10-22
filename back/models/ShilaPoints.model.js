const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true,
        unique: true,
        maxLength: 42,  //default ethereum address length
        minLength: 42
    },
    point: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('ShilaPoints', userSchema);
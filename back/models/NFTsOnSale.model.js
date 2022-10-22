const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    NFTid: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true        
    },
    image: {
        type: String,
        require: true         
    },
    power: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('NFTsOnSale', NFTSchema);
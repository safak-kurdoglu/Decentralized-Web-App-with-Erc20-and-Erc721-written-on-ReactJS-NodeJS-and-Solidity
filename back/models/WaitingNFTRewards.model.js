const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    NFTidF: {
        type: Number,
        require: true,
        unique: true
    },
    NFTidS: {
        type: Number,
        require: true,
        unique: true
    },
    ownerToSend: {
        type: String,
        require: true  
    }
});

module.exports = mongoose.model('WaitingNFTRewards', NFTSchema);
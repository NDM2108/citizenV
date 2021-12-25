const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Clan = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    clan: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Clan', Clan)
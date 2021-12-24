const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Village = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    village: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Village', Village)
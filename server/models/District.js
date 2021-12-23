const mongoose = require('mongoose')
const Schema = mongoose.Schema
const District = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    district: {
        type: String,
        required: true
    },
    provinceid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('District', District)
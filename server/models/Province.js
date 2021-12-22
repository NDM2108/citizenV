const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Province = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    province: {
        type: String,
        required: true
    },
    population: {
        type: String,
        required: true
    },
    houses: {
        type: String,
        required: true
    },
    progress: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Province', Province)
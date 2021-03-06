const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Account = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    level: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    superior: {
        type: String,
        required: true
    },
    timeopen: {
        type: String,
        required: true
    },
    timeclose: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Account', Account)
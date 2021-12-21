const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Citizen_info = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    id_card_number: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hometown: {
        type: String,
        required: true
    },
    permanent_address: {
        type: String,
        required: true
    },
    temporary_address: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    education_level: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Citizen_info', Citizen_info)
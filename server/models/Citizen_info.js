const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Citizen_info = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    provinceid: {
        type: String,
        required: true
    },
    districtid: {
        type: String,
        required: true
    },
    villageid: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    permanentaddress: {
        type: String,
        required: true
    },
    temporaryaddress: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    educationallevel: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Citizen_info', Citizen_info)
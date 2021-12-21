const mongoose = require('mongoose')
const Account = require('../models/Account')
const Province = require('../models/Province')
const Citizen_info = require('../models/Citizen_info')

class Controller {
    login(req, res, next) {
        Account.findOne({'username': req.body.username}, function(err, account) {
            if (!err) {
                if (account == null) {
                    res.send('failed')
                } else if (account.password == req.body.password) {
                    res.send('success')
                } else {
                    res.send('failed')
                }
            } else {
                res.staus(400).json({err: 'ERROR'})
            }
        })
    }

    register(req, res, next) {
        var citizen_info = {
            'id': req.body.id,
            'id_card_number': req.body.id_card_number,
            'fullname': req.body.fullname,
            'date_of_birth': req.body.date_of_birth,
            'gender': req.body.gender,
            'hometown': req.body.hometown,
            'permanent_address': req.body.permanent_address,
            'temporary': req.body.temporary,
            'religion': req.body.religion,
            'education_level': req.body.education_level,
            'job': req.body.job,
        }
        var connection = mongoose.connection;
        connection.collection('citizen_info').insertOne(citizen_info)
        res.send('sucess');
    }

    provinces(req, res, next) {
        Province.find({}, function(err, provinces) {
            res.json(provinces)
        })
    }
}

module.exports = new Controller;
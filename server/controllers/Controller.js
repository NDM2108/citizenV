require('dotenv').config()
const mongoose = require('mongoose')
const Account = require('../models/Account')
const Province = require('../models/Province')
const Citizen_info = require('../models/Citizen_info')
const jwt = require('jsonwebtoken')

class Controller {
    login(req, res, next) {
        Account.findOne({'username': req.body.username}, function(err, account) {
            if (!err) {
                if (account == null) {
                    res.sendStatus(401)
                } else if (account.password == req.body.password) {
                    const accessToken = jwt.sign({"username": account.username}, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn:'1h'
                    })
                    res.json({accessToken})
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.staus(400).json({err: 'ERROR'})
            }
        })
    }

    populationDeclaration(req, res, next) {
        var citizen_info = {
            'id': req.body.id,
            'card': req.body.card,
            'fullname': req.body.fullname,
            'dob': req.body.dob,
            'gender': req.body.gender,
            'hometown': req.body.hometown,
            'permanentaddress': req.body.permanentaddress,
            'temporaryaddress': req.body.temporaryaddress,
            'religion': req.body.religion,
            'educationallevel': req.body.educationallevel,
            'job': req.body.job,
        }
        var connection = mongoose.connection;
        connection.collection('citizen_infos').insertOne(citizen_info)
        res.send('success');
    }

    provinces(req, res, next) {
        Province.find({}, function(err, provinces) {
            res.json(provinces)
        })
    }

    citizen_infos(req, res, next) {
        Citizen_info.find({}, function(err, provinces) {
            res.json(provinces)
        })
    }

    add_account(req, res, next) {
        var account = {
            'locationid': req.body.locationid,
            'location': req.body.location,
            'password': req.body.password
        }
        var connection = mongoose.connection;
        connection.collection('accounts').insertOne(account)
        res.send('success');
    }
}

module.exports = new Controller;
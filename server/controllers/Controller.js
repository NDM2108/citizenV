require('dotenv').config()
const mongoose = require('mongoose')
const Account = require('../models/Account')
const Province = require('../models/Province')
const District = require('../models/District')
const Village = require('../models/Village')
const Citizen_info = require('../models/Citizen_info')
const jwt = require('jsonwebtoken')

class Controller {
    login(req, res, next) {
        Account.findOne({'id': req.body.id}, function(err, account) {
            if (!err) {
                if (account == null) {
                    res.sendStatus(401)
                } else if (account.password == req.body.password) {
                    const accessToken = jwt.sign({"id": account.id, "level": account.level}, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn:'1h'
                    })
                    res.json({'accessToken':accessToken, 'id': account.id, 'level':account.level})
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.staus(400).json({err: 'ERROR'})
            }
        })
    }

    population_declaration(req, res, next) {
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
        let level
        if (res.locals.decoded.level == 'a1') level = 'a2'
        if (res.locals.decoded.level == 'a2') level = 'a3'
        if (res.locals.decoded.level == 'a3') level = 'b1'
        if (res.locals.decoded.level == 'b1') level = 'b2'
        var account = {
            'password': req.body.password,
            'id': req.body.id,
            'address': req.body.address,
            'level': level,
            'status': "Active",
            'superior': res.locals.decoded.id
        }
        var connection = mongoose.connection;
        connection.collection('accounts').insertOne(account)
        res.send('success')++
    }

    get_accounts(req, res, next) {
        Account.find({}, function(err, accounts) {
            res.json(accounts)
        })
    }

    get_districts(req, res, next) {
        District.find({'provinceid': req.body.provinceid}, function(err, districts) {
            res.json(districts)
        })
    }

    get_villages(req, res, next) {
        Village.find({'districtid': req.body.districtid}, function(err, villages) {
            res.json(villages)
        })
    }
}

module.exports = new Controller;
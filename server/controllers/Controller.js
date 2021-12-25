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
                    const accessToken = jwt.sign({"id": account.id, "level": account.level, "address": account.address}, process.env.ACCESS_TOKEN_SECRET, {
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

    async population_declaration(req, res, next) {
        const province = await Province.findOne({'province': req.body.province})
        const district = await District.findOne({'district': req.body.district})
        const village = await Village.findOne({'village': req.body.village})
        var citizen_info = {
            'id': req.body.id,
            'fullname': req.body.fullname,
            'dob': req.body.dob,
            'gender': req.body.gender,
            'provinceid': province.id,
            'districtid': district.id,
            'villageid': village.id,
            'province': province.province,
            'district': district.district,
            'village':village.village,
            'permanentaddress': req.body.permanentaddress,
            'temporaryaddress': req.body.temporaryaddress,
            'religion': req.body.religion,
            'educationallevel': req.body.educationallevel,
            'job': req.body.job,
        }
        console.log(citizen_info);
        var connection = mongoose.connection;
        connection.collection('citizen_infos').insertOne(citizen_info)
        res.send('success');
    }

    provinces(req, res, next) {
        Province.find({}, function(err, provinces) {
            res.json(provinces)
        })
    }

    all_provinces(req, res, next) {
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
        if (res.locals.decoded.level == 'A1') level = 'A2'
        if (res.locals.decoded.level == 'A2') level = 'A3'
        if (res.locals.decoded.level == 'A3') level = 'B1'
        if (res.locals.decoded.level == 'B1') level = 'B2'
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
        res.send('success')
    }

    get_accounts(req, res, next) {
        Account.find({'superior': req.body.id}, function(err, accounts) {
            res.json(accounts)
        })
    }

    get_districts(req, res, next) {
        District.find({'province': req.body.province}, function(err, districts) {
            console.log(districts)
            res.json(districts)
        })
    }

    get_villages(req, res, next) {
        Village.find({'district': req.body.district}, function(err, villages) {
            res.json(villages)
        })
    }

    add_code(req, res, next) {
        if (res.locals.decoded.level == 'A1') {
            let province = {
                'province': req.body.name,
                'id': req.body.id,
                'progress': 'Chưa hoàn thành'
            }
            let connection = mongoose.connection;
            connection.collection('provinces').insertOne(province)
            res.send('success')
        } else if (res.locals.decoded.level == 'A2') {
            const province = Province.findOne({'id': res.locals.decoded.id})
            let district = {
                'district': req.body.name,
                'id': req.body.id,
                'province': province.province,
                'progress': 'Chưa hoàn thành'
            }
            let connection = mongoose.connection;
            connection.collection('districts').insertOne(district)
            res.send('success')
        } else if (res.locals.decoded.level == 'A3') {
            const district = District.findOne({'id': res.locals.decoded.id})
            let village = {
                'village': req.body.name,
                'id': req.body.id,
                'district': district.district,
                'progress': 'Chưa hoàn thành'
            }
            let connection = mongoose.connection;
            connection.collection('village').insertOne(village)
            res.send('success')
        }
        console.log(req.body.id, req.body.name)
    }
}

module.exports = new Controller;
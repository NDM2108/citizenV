require('dotenv').config()
const mongoose = require('mongoose')
const Account = require('../models/Account')
const Province = require('../models/Province')
const District = require('../models/District')
const Village = require('../models/Village')
const Clan = require('../models/Clan')
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
                    res.json({'accessToken':accessToken, 'id': account.id, 'level':account.level, 'address': account.address, 'status': account.status})
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
            'provinceid': req.body.provinceid,
            'districtid': req.body.districtid,
            'villageid': req.body.villageid,
            'clanid': req.body.clanid,
            'province': req.body.province,
            'district': req.body.district,
            'village':req.body.village,
            'permanentaddress': req.body.permanentaddress,
            'temporaryaddress': req.body.temporaryaddress,
            'religion': req.body.religion,
            'educationallevel': req.body.educationallevel,
            'job': req.body.job,
        }
        console.log(citizen_info);
        // var connection = mongoose.connection;
        // connection.collection('citizen_infos').insertOne(citizen_info)
        // res.send('success');
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
        if (res.locals.decoded.level == 'A1') {
            Citizen_info.find({}, function(err, infos) {
                res.send(infos)
            })
        } else if (res.locals.decoded.level == 'A2') {
            Citizen_info.find({'province': res.locals.decoded.address}, function(err, infos) {
                res.send(infos)
            })
        } else if (res.locals.decoded.level == 'A3') {
            Citizen_info.find({'district': res.locals.decoded.address}, function(err, infos) {
                res.send(infos)
            })
        } else if (res.locals.decoded.level == 'B1') {
            Citizen_info.find({'village': res.locals.decoded.address}, function(err, infos) {
                res.send(infos)
            })
        }
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
            'status': "Inactive",
            'superior': res.locals.decoded.id,
            'superiorAddress': res.locals.decoded.address,
            'timeopen': '',
            'timeclose': ''
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

    get_clans(req, res, next) {
        Clan.find({'village': req.body.village}, function(err, clans) {
            res.json(clans)
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
            let district = {
                'district': req.body.name,
                'id': req.body.id,
                'province': res.locals.decoded.address,
                'progress': 'Chưa hoàn thành'
            }
            let connection = mongoose.connection;
            connection.collection('districts').insertOne(district)
            res.send('success')
        } else if (res.locals.decoded.level == 'A3') {
            let village = {
                'village': req.body.name,
                'id': req.body.id,
                'district': res.locals.decoded.address,
                'progress': 'Chưa hoàn thành'
            }
            let connection = mongoose.connection;
            connection.collection('villages').insertOne(village)
            res.send('success')
        } else if (res.locals.decoded.level == 'B1') {
            let clan = {
                'clan': req.body.name,
                'id': req.body.id,
                'village': res.locals.decoded.address,
                'progress': 'Chưa hoàn thành'
            }
            let connection = mongoose.connection;
            connection.collection('clans').insertOne(clan)
            res.send('success')
        }
        console.log(req.body.id, req.body.name)
    }

    async get_inferiors(req, res, next) {
        console.log(res.locals.decoded.level)
        if (res.locals.decoded.level == 'A1') {
            const provinces = await Province.find({})
            res.json(provinces)
        } else if (res.locals.decoded.level == 'A2') {
            const districts = await District.find({'province': res.locals.decoded.address})
            res.json(districts)
        } else if (res.locals.decoded.level == 'A3') {
            const villages = await Village.find({'district': res.locals.decoded.address})
            res.json(villages)
        } else if (res.locals.decoded.level == 'B1') {
            const clans = await Clan.find({'village': res.locals.decoded.address})
            res.json(clans)
        }
    }

    check_account_exist(req, res, next) {
        Account.find({'id': req.body.id}, function(err, accounts) {
            if (accounts.length != 0) {
                res.send('exist')
            } else {
                res.send('not_exist')
            }
        })
    }

    async update_account(req, res, next) {
        var accountStatus = req.body.status ? 'Active' : 'Inactive'
        if (accountStatus == 'Active') {
            let doc = await Account.findOneAndUpdate({id: req.body.id}, {
                timeopen: req.body.timeopen,
                timeclose: req.body.timeclose,
                status: accountStatus
            }, {new: true})
            res.send('success')
        } else {
            let doc = await Account.findOneAndUpdate({id: req.body.id}, {
                timeopen: '',
                timeclose: '',
                status: accountStatus
            }, {new: true})
            res.send('success')
        }

    }
}

module.exports = new Controller;
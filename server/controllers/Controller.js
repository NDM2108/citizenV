const Account = require('../models/Account')

class Controller {
    login(req, res, next) {
        Account.find({}, function(err, accounts) {
            if (!err) {
                res.json(accounts)
            } else {
                res.staus(400).json({err: 'ERROR'})
            }
        })
    }
}

module.exports = new Controller;
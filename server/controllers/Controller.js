const Account = require('../models/Account')

class Controller {
    login(req, res, next) {
        console.log(req.body);
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
}

module.exports = new Controller;
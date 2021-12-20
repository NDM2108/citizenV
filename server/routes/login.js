const express = require('express');
const router = express.Router()
const Account = require('../models/Account')
router.get('/', (req, res) => res.send('USER ROUTE'))

module.exports = router
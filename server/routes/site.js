const express = require('express');
const router = express.Router()
const controller = require('../controllers/Controller')

router.use('/login', controller.login)

module.exports = router
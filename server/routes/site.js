const express = require('express');
const router = express.Router()
const controller = require('../controllers/Controller')
const verifyToken = require('../middleware/auth')

router.post('/login', controller.login)

router.post('/population_declaration', controller.population_declaration)

router.get('/provinces', verifyToken, controller.provinces)

router.get('/all_provinces', controller.all_provinces)

router.get('/citizen_infos', verifyToken, controller.citizen_infos)

router.post('/add_account', verifyToken, controller.add_account)

router.post('/accounts', controller.get_accounts)

router.post('/get_districts', controller.get_districts)

router.post('/get_villages', controller.get_villages)

router.post('/add_code', verifyToken, controller.add_code)

router.get('/get_inferiors', verifyToken, controller.get_inferiors)

module.exports = router
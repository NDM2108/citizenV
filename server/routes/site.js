const express = require('express');
const router = express.Router()
const controller = require('../controllers/Controller')
const verifyToken = require('../middleware/auth')

router.post('/login', controller.login)

router.post('/population_declaration', controller.populationDeclaration)

router.get('/provinces', controller.provinces)

router.get('/citizen_infos', controller.citizen_infos)

module.exports = router
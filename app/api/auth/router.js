const express = require('express')
const router = express.Router()
const controller =  require('./controller.js')

router.post('/auth/signin',controller.sign)
router.post('/auth/signup',controller.signup)

module.exports = router
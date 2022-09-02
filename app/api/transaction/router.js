const express = require('express')
const router = express.Router()
const {auth} = require('../../middleware/auth')
const {getAlltransaction, getDetailTransaction} =require('./controller')

router.get('/transaction',auth,getAlltransaction)
router.get('/transaction/:id',auth,getDetailTransaction)

module.exports = router
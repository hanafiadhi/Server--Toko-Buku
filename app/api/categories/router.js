const express = require('express')
const router = express.Router()
const {auth} = require('../../middleware/auth')
const {getAllCategories, createCategories,updateCategories,deleteCategroies} =require('./controller')


router.get('/categories',auth,getAllCategories)
router.post('/categories',auth,createCategories)
router.patch('/categories/:id',auth,updateCategories)
router.delete('/categories/:id',auth,deleteCategroies)

module.exports = router
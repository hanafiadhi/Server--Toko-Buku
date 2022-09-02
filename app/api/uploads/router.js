const express = require('express')
const router = express.Router()
const {auth} = require('../../middleware/auth')
const {uploadImage} = require('./controller')
const upload = require('../../middleware/multer')

router.post('/uploads',auth,upload.single('image'),uploadImage)

module.exports = router
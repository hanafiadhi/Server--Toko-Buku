const express =  require('express')
const router = express.Router()
const {auth} = require('../../middleware/auth')
const {getAllBooks, createBooks, updateBooks, deleteBook}  = require('./controller')

router.get('/books',auth,getAllBooks)
router.post('/books',auth,createBooks)
router.patch('/books/:id',auth,updateBooks)
router.delete('/books/:id',auth,deleteBook)

module.exports = router
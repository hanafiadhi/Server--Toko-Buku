const {
    Book,
    Category
} = require('../../db/models')
const {
    Op,
} = require('sequelize')
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const key = () => {
    if (myCache.has('myKey') === true) {
        console.log('Delete data from Node Cache');
        myCache.del("myKey")
    }
}
module.exports = {
    getAllBooks: async (req, res, next) => {
        try {
            const {
                keyword = "", category = ""
            } = req.query
            if (myCache.has('myKey') && keyword === '' && category === '') {
                console.log('Get data from Node Cache');
                return res.status(200).json({
                    message: 'Get All Books from Cache',
                    data: JSON.parse(myCache.get('myKey'))
                })
            }
            //cek jika ada parameter
            let conditonal = {
                user: req.user.id
            }
            if (keyword !== '') {
                conditonal = {
                    ...conditonal,
                    title: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            }
            if (category !== '') {
                conditonal = {
                    ...conditonal,
                    category: category
                }
            }
            //cek jika tidak ada aparameter dan set cache
            const data = await Book.findAll({
                where: conditonal,
                include: {
                    model: Category,
                    required: true,
                    attributes: ['id', 'name']
                }
            })

            success = myCache.set("myKey", JSON.stringify(data), 10000);
            console.log('Fetch data from database');

            const response = res.status(200).json({
                message: 'Success get all books',
                data: data
            })
            return response
            //kembalikan data yang sudah di set cachenya

        } catch (error) {
            next(error)
        }
    },
    createBooks: async (req, res, next) => {
        try {
            let user = req.user.id
            console.log(user)
            const {
                title,
                price,
                category,
                author,
                published,
                stock,
                image
            } = req.body
            const checkCategory = await Category.findOne({
                where: {
                    id: category,
                    user: user
                }
            })
            if (!checkCategory) return res.status(404).json({
                message: 'id category not found'
            })

            const books = await Book.create({
                title,
                price,
                category,
                author,
                published,
                stock,
                image,
                user
            })
            key()
            return res.status(201).json({
                message: 'Success',
                data: books
            })
        } catch (error) {
            next(error)
        }
    },
    updateBooks: async (req, res, next) => {
        try {
            const user = req.user.id
            const {
                id
            } = req.params
            const {
                title,
                price,
                category,
                author,
                published,
                stock,
                image
            } = req.body
            const checkCategory = await Category.findOne({
                where: {
                    id: category,
                    user: user
                }
            })
            if (!checkCategory) return res.status(404).json({
                message: 'id category not found'
            })

            const cekBook = await Book.findByPk(id)
            if (!cekBook) return res.status(404).json({
                message: "id Book not found"
            })
            const updateBook = await cekBook.update({
                title,
                price,
                category,
                author,
                published,
                stock,
                image,
                user: user
            })
            key()
            return res.status(200).json({
                message: 'success',
                data: updateBook
            })
        } catch (error) {
            next(error)
        }
    },
    deleteBook: async (req, res, next) => {
        try {
            const {
                id
            } = req.params
            const cekBook = await Book.findByPk(id)
            if (!cekBook) return res.status(403).json({
                message: "Book not found"
            })
            cekBook.destroy()

            return res.status(200).json({
                message: 'Success',
                data: cekBook
            })
            key()
        } catch (error) {
            next(error)
        }
    }
}
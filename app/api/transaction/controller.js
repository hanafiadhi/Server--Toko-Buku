const {
    Transaction,
    DetailTransaction,
    Book
} = require('../../db/models')

const {
    Op,
} = require('sequelize')

module.exports = {
    getAlltransaction: async (req, res, next) => {
        try {
            const {
                keyword = ""
            } = req.query
            //cek jika ada parameter
            let conditonal = {
                user: req.user.id
            }
            if (keyword !== '') {
                conditonal = {
                    ...conditonal,
                    invoice: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            }
            //cek jika tidak ada aparameter dan set cache
            const data = await Transaction.findAll({
                where: conditonal,
                include: {
                    model: DetailTransaction,
                    as: 'detailTransaction',
                    required: true,
                },
                attributes: ["id",
                    "invoice",
                    "user",
                    "date"
                ]
            })

            const response = res.status(200).json({
                message: 'Success get all transaction',
                data: data
            })
            return response
            //kembalikan data yang sudah di set cachenya

        } catch (error) {
            next(error)
        }
    },
    getDetailTransaction: async (req, res, next) => {
        try {
            const {id} = req.params
            //cek jika ada parameter
            const data = await Transaction.findAll({
                where: {id},
                include: {
                    model: DetailTransaction,
                    as: 'detailTransaction',
                    required: true,
                },
                attributes: ["id",
                    "invoice",
                    "user",
                    "date"
                ]
            })

            const response = res.status(200).json({
                message: 'Success get detail transaction',
                data: data
            })
            return response
            //kembalikan data yang sudah di set cachenya

        } catch (error) {
            next(error)
        }
    },
}
const {
    Transaction,
    DetailTransaction,
    Book
} = require('../../db/models')
const {
    Op
} = require('sequelize')
const sequelize = require('../../db/models').sequelize
const NodeCache = require("node-cache");
const myCache = new NodeCache();

module.exports = {
    checkout: async (req, res, next) => {
        const t = await sequelize.transaction()
        try {
            const {
                payload
            } = req.body;
            const user = req.user.id;

            const transaction = await Transaction.create({
                invoice: `T-${Math.floor(10000 + Math.random() * 900000)}`,
                date: new Date(),
                user: user
            }, {
                transaction: t
            })

            let errorBookIdNotFound = [],
                errorBookIdStock = [],
                updateStock = []

            for (let i = 0; i < payload.length; i++) {
                const checkBook = await Book.findOne({
                    where: {
                        id: payload[i].bookId,
                        user: user
                    }
                })

                if (!checkBook) {
                    errorBookIdNotFound.push(payload[i].bookId)
                    continue
                } else {
                    payload[i].transaction = transaction.id
                    payload[i].titleBook = checkBook.title
                    payload[i].book = checkBook.id
                    payload[i].imageBook = checkBook.image
                    payload[i].priceBook = checkBook.price
                    payload[i].user = user
                    updateStock.push({
                        id: payload[i].bookId,
                        stock: checkBook.stock - payload[i].quantity
                    })
                    if (payload[i].quantity > checkBook.stock) {
                        errorBookIdStock.push(
                            `${payload[i].quantity} - ${checkBook.stock}`
                        )
                    }
                }

            }

            if (errorBookIdStock.length !== 0) {
                return res.status(400).json({
                    message: `book stock is not enough with id : ${errorBookIdStock.join(',')} and user : ${user}`
                })
            }

            if (errorBookIdNotFound.length !== 0) {
                return res.status(400).json({
                    message: `No book with id: ${errorBookIdNotFound.join(',')} and user : ${user}`
                })
            }

            await Book.bulkCreate(updateStock, {
                updateOnDuplicate: ['stock']
            }, {
                transaction: t
            })

            const detailTransaction = await DetailTransaction.bulkCreate(payload, {
                transaction: t
            })
            await t.commit()
            if (myCache.has('myKey') === true) {
                console.log('Delete data from Node Cache');
                myCache.del("myKey")
            }
            return res.status(201).json({
                message: "success Checkout",
                data: detailTransaction
            })
        } catch (error) {
            if (t) await t.rollback
            next(error)
        }
    }
}
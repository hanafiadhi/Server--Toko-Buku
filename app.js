const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRouter = require('./app/api/auth/router.js')
const categoriesRouter = require("./app/api/categories/router.js")
const booksRouter = require('./app/api/books/router')
const uploadImage = require('./app/api/uploads/router')
const checkoutBook = require('./app/api/checkout/router')
const transactionRouter = require('./app/api/transaction/router')
const Url = '/api/v1/'
const app = express();
const cors = require('cors')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


app.use(`${Url}`, authRouter);
app.use(`${Url}`, categoriesRouter);
app.use(`${Url}`, booksRouter);
app.use(`${Url}`, uploadImage);
app.use(`${Url}`, checkoutBook);
app.use(`${Url}`, transactionRouter);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "something wrong";
    return res.status(errorStatus).json({
        succuess: false,
        status: errorStatus,
        meessage: errorMessage,
        stack: error.stack,
    });
});

module.exports = app;
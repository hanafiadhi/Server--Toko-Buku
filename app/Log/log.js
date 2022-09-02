
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const Logger = winston.createLogger({
    transports: [
        new DailyRotateFile({
            handleExceptions:true,
            handleRejections:true,
            filename: 'app-%DATE%.log',
            zippedArchive: false,
            maxSize: '1m',
            maxFiles: '7d'
        })
    ]
})

module.exports = {Logger};
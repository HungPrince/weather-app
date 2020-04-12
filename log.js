const winston = require('winston');
const isProduction = process.env.NODE_ENV === 'prod';
const logger = winston.createLogger({
    level: isProduction ? 'info' : 'debug',
    format: winston.format.combine(winston.format.json(), winston.format.timestamp(), winston.format.simple()),
    transports: [isProduction ? new winston.transports.File({ filename: `logs/errors/${new Date().getTime()}.log`, level: 'error' }) : new winston.transports.Console()]
});

module.exports = logger;

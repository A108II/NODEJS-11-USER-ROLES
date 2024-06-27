const {logEvents} = require('./log_events');

const errorHandler = (err, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
    res.status(500).send(err.message);
    next();
}

module.exports = errorHandler;


const log4js = require('log4js');

const logger = log4js.getLogger();

if (process.env.NODE_ENV !== 'production') {
  logger.level = 'debug';
}
else if (process.env.LOG_LEVEL) {
  logger.level = process.env.LOG_LEVEL;
}

module.exports = logger;

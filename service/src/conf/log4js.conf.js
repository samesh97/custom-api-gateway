const log4js = require("log4js");

const logger = log4js.getLogger();

const logError = ( error ) => {
    logger.error( error );
}
const logInfo = ( message ) => {
    logger.info( message );
}

module.exports = { logError, logInfo }
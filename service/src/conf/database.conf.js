const oracledb = require('oracledb');
const { logInfo, logError } = require('./log4js.conf');

let connection;
const connectToOracleDB = async () => {
    logInfo('Connecting to Oracle Database...')
    try
    {
        connection = await oracledb.getConnection({
            user: 'system',
            password: '12345',
            connectionString: "localhost:1521/XE"
        });
        logInfo('Connected to Oracle Database.')
    }
    catch( error )
    {
        logError(`Error while connecting to Oracle Database: ${error}`)
    }
}

const executeQuery = async (sql, isCommit = false) => {
    try
    {
        logInfo(`Executing query in Oracle DB: ${sql}`);
        const result = await connection.execute(sql);
        if( isCommit )
        {
            connection.commit();
        }
        return result;
    }
    catch (err)
    {
        logError(`Error whle executing query: ${err}`);
        return null;
    }
}


module.exports = { connectToOracleDB, executeQuery };
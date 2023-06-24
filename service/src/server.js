const express = require('express');
const app = express();
const { heathCheckRoute, register } = require('./routes/heathcheck.route');
const { userRoute } = require('./routes/user.route');
const { connectToOracleDB } = require('./conf/database.conf');
const { connectToRedis } = require('./conf/redis.conf');
const { logInfo } = require('./conf/log4js.conf');

const PORT = process.env.PORT | 5001;
const gatewayURL = 'http://localhost:5000/register/';
const serviceURL = `http://localhost:${PORT}`;

app.use(express.json());
app.use('/health', heathCheckRoute);
app.use('/users', userRoute);

app.listen(PORT, () => 
{
    logInfo(`Server is up & running on port ${PORT}`);
    connectToOracleDB();
    connectToRedis();
    register(gatewayURL, serviceURL);
});

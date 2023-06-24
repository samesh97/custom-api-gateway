const { createClient }  = require("redis");

let isRedisConnected = false;
const redisClient = createClient();
console.log("Connecting to redis...");

redisClient.on('ready', () => {
    isRedisConnected = true;
    console.log("Connected to redis.");
});
redisClient.on('error', (err) => {
    isRedisConnected = false;
    console.error('Error while connecting to redis ' + err);
});

redisClient.connect();

const setCache = async (key, value) => {
    if (isRedisConnected)
    {
        await redisClient.set(key, value);
    }
}

const getCache = async (key) => {
    if( isRedisConnected )
    {
        return await redisClient.get(key);
    }
    return undefined;
}

module.exports = { setCache, getCache };

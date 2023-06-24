const express = require('express');
const app = express();
const { heathCheckRoute, register } = require('./heathcheck.route');
const { getCache, setCache } = require('./conf/redis.conf');

const PORT = process.env.PORT | 5001;
const gatewayURL = 'http://localhost:5000/register/';
const serviceURL = `http://localhost:${PORT}`;

app.use(express.json());
app.use('/health', heathCheckRoute);

app.use('/hello', async (req, res) => 
{
    let helloCount = await getCache('helloCount') | 0;
    setCache('helloCount', helloCount+1);
    res.json(`Hello was called ${helloCount} times`);
});

app.listen(PORT, () => 
{
    console.log(`Server is up & running on port ${PORT}`);
    register(gatewayURL, serviceURL);
});

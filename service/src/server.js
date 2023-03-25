const express = require('express');
const app = express();
const { heathCheckRoute, register } = require('./heathcheck.route');

const PORT = process.env.PORT;
const gatewayURL = 'http://localhost:5000/register/';
const serviceURL = `http://localhost:${PORT}`;

app.use(express.json());
app.use('/health/', heathCheckRoute);

app.use('/hello', (req, res) => {
    res.json(`hello from service ${serviceURL}`);
});

app.listen(PORT, () => {
    console.log(`Server is up & running on port ${PORT}`);
    register(gatewayURL, serviceURL);
});

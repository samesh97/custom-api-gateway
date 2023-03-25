const { Router } = require('express');
const axios = require('axios');
const heathCheckRoute = Router();

heathCheckRoute.get('/', (req, res) => {
    console.log("Health check passed");
    return res.status(200).json(`Heathcheck success!`);
});

const register = (gatewayURL, servericeUrl) => {
    axios.post(gatewayURL, {
        url: servericeUrl
    })
    .then(response => {
        console.log("Service registration success!");
    }, error => {
        console.log("Service registration failed!");
    });
}

module.exports = { heathCheckRoute, register };
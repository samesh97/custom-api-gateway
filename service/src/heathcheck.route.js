const { Router } = require('express');
const axios = require('axios');
const heathCheckRoute = Router();

heathCheckRoute.get('/', (req, res) => {
    console.log("Health check passed");
    return res.status(200).json(`Heathcheck success!`);
});

const register = (gatewayURL, servericeUrl) => {
    
    const interval = setInterval(() => {
      axios
        .post(gatewayURL, {
          url: servericeUrl,
        })
        .then(res => {
            console.log("Service registration success!");
            clearInterval(interval);
        })
        .catch(error => {
            console.log("Service registration failed!");
        });
    }, 5000);
}

module.exports = { heathCheckRoute, register };
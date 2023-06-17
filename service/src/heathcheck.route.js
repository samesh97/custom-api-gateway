const { Router } = require('express');
const axios = require('axios');
const heathCheckRoute = Router();

let lastHeathCheckFromServer;
const timeoutPeriodInSeconds = 60;

heathCheckRoute.get('/', (req, res) => {
    lastHeathCheckFromServer = Date.now();
    console.log("Health check passed at " + new Date());
    return res.status(200).json(`Heathcheck success!`);
});

const register = (gatewayURL, serviceUrl) => {
    setInterval(() => {
        let currentTimestamp = Date.now();
        const isTimedOut = !lastHeathCheckFromServer || millisToSeconds(currentTimestamp - lastHeathCheckFromServer) >= timeoutPeriodInSeconds;
        if( isTimedOut )
        {
            axios
                .post(gatewayURL, {
                    url: serviceUrl,
                })
                .then(res => {
                    console.log("Service registration success!");
                })
                .catch(error => {
                    console.log("Service registration failed!");
                }
           );
        }
    }, 10000);
}

const millisToSeconds = (millis) => {
    return Math.floor(millis / 1000);
}

module.exports = { heathCheckRoute, register };
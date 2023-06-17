const express = require('express');
const redirectRoute = express.Router();
const axios = require('axios');
const { getRedirectURL, heathCheckFailed } = require('../registry/registry.route');
const e = require('express');

redirectRoute.all('/:any', async (req, res, next) => {
    const resoucePath = req.url;
    const httpMethod = req.method;
    const requestBody = req.body;
    const requestHeaders = req.headers;
    const maxRetries = 3;
   
    for(let i = 0; i < maxRetries; i++)
    {
        let redirectURl = getRedirectURL();
        const response = await sendRequest(redirectURl, resoucePath, httpMethod, requestBody);
        if(response)
        {
            return res.json(response);
        }
        console.log(`Request failed with ${redirectURl}, retrying..`);
        heathCheckFailed(redirectURl);
    }
    console.log("Came to last")
    next();
    
});

sendRequest = async (redirectURl, resoucePath, httpMethod, requestBody) => {
    if(!redirectURl)
    {
        return "Service unavailable";
    }
    const fullUrl =  redirectURl + resoucePath;
    try
    {
        let result = await axios({
            url: fullUrl,
            method: httpMethod,
            data: requestBody
        });
        return result.data;
    }
    catch(e)
    {
        return undefined;
    }
}

module.exports = { redirectRoute };
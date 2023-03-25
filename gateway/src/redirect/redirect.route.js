const express = require('express');
const redirectRoute = express.Router();
const axios = require('axios');
const { getRedirectURL } = require('../registry/registry.route');

redirectRoute.all('/:any', async (req, res) => {
    const resoucePath = req.url;
    const httpMethod = req.method;
    const requestBody = req.body;
    const requestHeaders = req.headers;
    const redirectURL = getRedirectURL() + resoucePath;

    try
    {
        await axios({
            url: redirectURL,
            method: httpMethod,
            data: requestBody,
            headers: requestHeaders
        })
        .then(response => {
            return res.json(response.data);
        })
        .catch(error => {
            return res.status(404);
        });
    }
    catch( error ) { return res.status(404); }
    return res.status(404);
});

module.exports = { redirectRoute };
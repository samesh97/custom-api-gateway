const express = require('express');
const registryRouter = express.Router();
const fs = require('fs');
const Heath = require('../heathcheck/heath.model');

const path = __dirname + "\\registry.json";

registryRouter.post('/', (req, res) => {
    const serviceURL = req.body.url;
    if(!serviceURL) {
        return res.status(400).json("Service URL not found");
    }
    registerService(serviceURL);
    return res.status(201).json("Service registration success");

});

const registerService = (url) => {
    const services = getAllServiceURLs();
    if(!services.find(object => object.url == url))
    {
        const heath = new Heath();
        heath.url = url,
        heath.failedCount = 10,
        heath.lastCheckPassed = true

        services.push( heath );
        const allServices = JSON.stringify(services);
        fs.writeFileSync(path, allServices, 'utf-8');
    }
}

const getRedirectURL = () => {
    let services = getAllServiceURLs();
    //need to optimize the routing mechanism without using a random index
    services = services.filter( object => object.lastCheckPassed );
    const randomIndex = Math.floor( Math.random() * services.length );
    return services[randomIndex]?.url;
}

const getAllServiceURLs = () => {
    createFile();
    const registry = fs.readFileSync(path, 'utf-8');
    const services = JSON.parse(registry);
    return services;
}
const heathCheckFailed = (url) => {
    let services = getAllServiceURLs();
    const service = services.find(object => object.url == url );
    if( !service ) {
        return;
    }
    service.failedCount -= 1;
    service.lastCheckPassed = false;

    if(service.failedCount <= 0) {
        services = services.filter(object => !object.url == url );
    }
    const allServices = JSON.stringify(services);
    fs.writeFileSync(path, allServices, 'utf-8');
}

const heathCheckPassed = (url) => {
    let services = getAllServiceURLs();
    const service = services.find( object => object.url == url );
    if( !service ) {
        return;
    }
    service.lastCheckPassed = true;
    service.failedCount = 10;

    const allServices = JSON.stringify(services);
    fs.writeFileSync(path, allServices, 'utf-8');
}

const createFile = () => {
    if( !fs.existsSync(path) ) 
    {
        fs.writeFileSync(path, JSON.stringify( [] ));
    }
}

module.exports = { registryRouter, getAllServiceURLs, getRedirectURL, heathCheckFailed, heathCheckPassed };
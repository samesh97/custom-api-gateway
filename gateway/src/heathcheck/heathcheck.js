const { getAllServiceURLs, heathCheckFailed, heathCheckPassed } = require('../registry/registry.route');
const { default: axios } = require('axios');

const checkHeath = () => {
    setInterval(() => {
        const services = getAllServiceURLs();
        services.forEach(service => {
            let url = service.url + "/health";
            axios.get(url)
                .then(res => heathCheckPassed(service.url) )
                .catch(error => heathCheckFailed( service.url )
            );
        });
    }, 10000);
}

module.exports = { checkHeath };
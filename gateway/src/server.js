const express = require('express');
const { registryRouter } = require('./registry/registry.route');
const { redirectRoute } = require('./redirect/redirect.route');
const { checkHeath } = require('./heathcheck/heathcheck');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use('/register', registryRouter);
app.use('/', redirectRoute);

app.listen(PORT, () => {
    console.log(`Gateway is up & running on port ${PORT}`);
    checkHeath();
});
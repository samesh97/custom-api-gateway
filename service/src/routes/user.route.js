const { Router } = require('express');
const { executeQuery } = require('../conf/database.conf');
const { getCache, setCache } = require('../conf/redis.conf');
const userRoute = Router();

userRoute.post('/',async (req, res) => {
    const user = req.body;
    const sql = `INSERT INTO users (username, password) VALUES('${user.username}', '${user.password}')`;
    const result = await executeQuery(sql, true);
    return res.json(result);
});

userRoute.get('/:username', async(req, res) => {
    const username = req.params['username'];
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    const cachedUser = await getCache(username);
    if( cachedUser )
    {
        return res.json( cachedUser );
    }

    const result = await executeQuery(query);
    let response = "No users found";
    if(result.rows.length > 0)
    {
        response = result.rows[0];
        setCache(username, response);
    }
    return res.json(response);
});

module.exports = { userRoute };
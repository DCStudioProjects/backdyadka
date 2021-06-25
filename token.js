const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

router.get('/', async function (req, api) {
    const token = (await axios.post('http://103.119.112.27/partner_api/request_token', querystring.stringify({ 'key': '160c907041cac0fd84c367c1e0031b67', 'token': '3e6135313fa5e4f46b57fb3878b5dfe5b0730839' }))).data;
    console.log(token)
    api.send({ token: token.token })
});

module.exports = router;

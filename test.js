const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async function (req, api) {
    try {
        const test = (await axios.get(`https://rezkion.com/series/comedy/${req.query.id}-teoriya-bolshogo-vzryva-2007.html`)).data;
        api.send({ test: test })
    } catch (e) {
        api.send({ error: e })
    }
});

module.exports = router;

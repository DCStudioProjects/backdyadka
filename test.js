const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async function (req, api) {
    const test = (await axios.get(`https://rezkion.com/series/comedy/${req.query.id}-teoriya-bolshogo-vzryva-2007.html`)).data;
    api.send({ test: test })
});

module.exports = router;

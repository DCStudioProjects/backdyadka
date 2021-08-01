const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async function (req, api) {
    const data = (await axios.get(`https://api.alloha.tv/?token=04941a9a3ca3ac16e2b4327347bbc1&kp=685246`)).data.data.seasons;
    const result = Object.keys(data).map((key) => (
        {
            episodes: Object.keys(data[key].episodes).map((res) => (
                data[key].episodes[res]
            )),
            season: key
        }
    ));
    api.send({ details: result })
});

module.exports = router;

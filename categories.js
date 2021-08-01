const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', async (req, api) => {
    const data = (await axios.get(`http://f0561301.xsph.ru/categories.php?category=${req.query.category}`)).data
    const selector = cheerio.load(data);
    const titles = selector('.b-content__inline_item-link a').map((i, x) => (
        selector(x).text()
    )).toArray();

    const ids = selector('.b-content__inline_item').map((i, x) => (
        selector(x).attr('data-id')
    )).toArray();

    const images = selector('.b-content__inline_item-cover img').map((i, x) => (
        selector(x).attr('src')
    )).toArray();

    const result = ids.map((res, key) => (
        { id: ids[key], title: titles[key], poster: images[key] }
    ));
    const title = selector('.b-content__htitle h1').text();
    console.log(title);
    api.send({ results: result })
})

module.exports = router;
const express = require('express');
const router = express.Router();
//const chromium = require('chrome-aws-lambda');
//const puppeteer = require('puppeteer')
const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

router.get('/', async (req, api) => {
    const Translate = async () => {
        const rezkatranslate = (await axios.get(`http://f0561301.xsph.ru/?id=${req.query.id}`)).data;
        const selector = cheerio.load(rezkatranslate);
        const translations = selector('.b-translator__item').map((i, x) => (
            { id: selector(x).attr('data-translator_id'), name: selector(x).attr('title'), class: selector(x).attr('class') }
        )).toArray();

        return translations;
    }
    const Urls = async () => {
        if (req.query.season !== undefined && req.query.episode !== undefined) {
            if (req.query.translation !== undefined) {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': req.query.translation, 'season': req.query.season, 'episode': req.query.episode, 'action': 'get_episodes' }));
                return rezkaapi.data
            } else {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': (await Translate())[0].id, 'season': req.query.season, 'episode': req.query.episode, 'action': 'get_episodes' }));
                return rezkaapi.data
            }
        } else {
            if (req.query.translation !== undefined) {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': req.query.translation, 'action': 'get_movie' }));
                return rezkaapi.data
            } else {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': (await Translate())[0].id, 'action': 'get_movie' }));
                return rezkaapi.data
            }
        }
    }

    const urls = (await Urls()).url.split(',').reverse().reduce(
        (acc, item) => {
            const [_, quality, url1, url2] = item.match(/\[(.+?)\](.+?) or (.+)/);
            acc.push({ quality: quality, urls: [url1, url2] });
            return acc;
        },
        []
    );

    api.send({ /*translations: await Translate(),*/ urls: urls });
}
);


module.exports = router;
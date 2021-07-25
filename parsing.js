const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

router.get('/', async (req, api) => {
    const Translate = async () => {
        console.log(req.query.id)
        const rezkatranslate = (await axios.get(`http://f0561301.xsph.ru/?id=${req.query.id}`)).data;
        const selector = cheerio.load(rezkatranslate);
        const translations = selector('.b-translator__item').map((i, x) => (
            { id: selector(x).attr('data-translator_id'), name: selector(x).attr('title') }
        )).toArray();

        if (translations.length === 0) {
            var textNode = selector('body > script').map((i, x) => x.children[0])
                .filter((i, x) => x && x.data.match(/sof.tv.initCDNSeriesEvents/)).get(0);
            const id = textNode.data.match(/\d+/g)[1];
            console.log({ id: id, name: 'Оригинальный' })
            return [{ id: id, name: 'Оригинальный' }];
        } else {
            return translations;
        }
    }

    const Urls = async () => {
        if (req.query.season !== undefined && req.query.episode !== undefined) {
            if (req.query.translation !== undefined) {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': req.query.translation, 'season': req.query.season, 'episode': req.query.episode, 'action': 'get_episodes' }));
                return rezkaapi.data
            } else {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': (await Translate())[0].id || (await Translate()).id, 'season': req.query.season, 'episode': req.query.episode, 'action': 'get_episodes' }));
                return rezkaapi.data
            }
        } else {
            if (req.query.translation !== undefined) {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': req.query.translation, 'action': 'get_movie' }));
                return rezkaapi.data
            } else {
                const rezkaapi = await axios.post('http://rezkance.com/ajax/get_cdn_series/', querystring.stringify({ 'id': req.query.id, 'translator_id': (await Translate())[0].id || (await Translate()).id, 'action': 'get_movie' }));
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

    //res.status(200).json({ /*translations: await Translate(),*/ urls: urls });
    api.send({ urls: urls })

});

module.exports = router;

const express = require('express');
const router = express.Router();
//const chromium = require('chrome-aws-lambda');
//const puppeteer = require('puppeteer')
const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

router.get('/', async function (req, api) {
    if (req.query.source === 'vcdn') {
        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        const pageurl = req.query.type === 'tv_series' ? `https://38.svetacdn.in/DtnlpDk36lY6/tv-series/${req.query.id}?season=${req.query.season}&episode=${req.query.episode}&translation=${req.query.translation}` : `https://38.svetacdn.in/DtnlpDk36lY6/movie/${req.query.id}?translation=${req.query.translation}`;
        await page.goto(pageurl);
        await page.waitForSelector('input');
        await page.mouse.click(400, 300);
        const res = await page.waitForResponse(response => response.url().includes('seg-1-v1-a1.ts'));
        const url = await res.url();
        const result = url.substr(0, url.length - 26);
        api.send({ url: result });
        await browser.close();
    }

    if (req.query.source === 'rezka') {
        /*const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });*/
        const Translate = async () => {
            if (req.query.season !== undefined && req.query.episode !== undefined) {
                const rezkatranslate = (await axios.get(`https://voidboost.net/embed/${req.query.kp}?s=${req.query.season}&e=${req.query.episode}`)).data;
                const $ = cheerio.load(rezkatranslate);
                const list = $('#translator-name > option');
                list.filter((i, res) => {
                    return $(this).children()
                })
                let items = list.get();
                const arr = items.map(e => {
                    return { id: Number(e.attribs.value) / 10, name: e.children[0].data }
                });
                arr.splice(0, 1);
                return arr
            } else {
                const rezkatranslate = (await axios.get(`https://voidboost.net/embed/${req.query.kp}`)).data;
                const $ = cheerio.load(rezkatranslate);
                const list = $('#translator-name > option');
                list.filter((i, res) => {
                    return $(this).children()
                })
                let items = list.get();
                const arr = items.map(e => {
                    return { id: Number(e.attribs.value) / 10, name: e.children[0].data }
                });
                arr.splice(0, 1);
                return arr
            }
        }
        const Urls = async () => {
            const rezkaapi = await axios.post('https://rezkion.com/ajax/get_cdn_series/?t=1624370189132', querystring.stringify({ 'id': req.query.id, 'season': req.query.season, 'episode': req.query.episode, 'translator_id': req.query.translation, 'action': 'get_episodes' }));
            const urls = rezkaapi.data.url.split(',').reverse().reduce(
                (acc, item) => {
                    const [_, quality, url1, url2] = item.match(/\[(.+?)\](.+?) or (.+)/);
                    acc.push({ quality: quality, urls: [url1, url2] });
                    return acc;
                },
                []
            );
            return urls
        }
        api.send({ translations: await Translate(), urls: await Urls() });
    }
}
);


module.exports = router;
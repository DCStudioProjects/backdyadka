const express = require('express');
const router = express.Router();
const chromium = require('chrome-aws-lambda');
const axios = require('axios');
//const puppeteer = require('puppeteer')
//const cheerio = require('cheerio');

router.get('/', async function (req, api) {

    /*const browser = await puppeteer.launch({
        headless: false
    });*/

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
        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        if (req.query.translation !== undefined) {
            await page.evaluateOnNewDocument(
                token => {
                    localStorage.clear();
                    localStorage.setItem('pljsquality', token);
                }, '1080p');
            await page.goto(`https://voidboost.net/embed/${req.query.kp}?s=${req.query.season}&e=${req.query.episode}&t=${req.query.translation}&autoplay=1`);
            const url = await page.waitForResponse(response => response.url().includes('hls:manifest.m3u8'));
            await page.waitForSelector('#translator-name > option');
            const result = await page.$$eval('#translator-name > option', el =>
                el.reduce((pr, x) => {
                    return pr.concat({ token: x.getAttribute('data-token'), id: Number(x.getAttribute('value')) / 10, name: x.textContent })
                }, []));
            const send = { translations: result, url: url?.url() }
            api.send(send);
            await browser.close();

        } else {
            await page.evaluateOnNewDocument(
                token => {
                    localStorage.clear();
                    localStorage.setItem('pljsquality', token);
                }, '1080p');
            await page.goto(`https://voidboost.net/embed/${req.query.kp}?s=${req.query.season}&e=${req.query.episode}&autoplay=1`);
            await page.waitForSelector('#translator-name > option');
            const url = await page.waitForResponse(response => response.url().includes('hls:manifest.m3u8'));
            const result = await page.$$eval('#translator-name > option', el =>
                el.reduce((pr, x) => {
                    return pr.concat({ token: x.getAttribute('data-token'), id: Number(x.getAttribute('value')) / 10, name: x.textContent })
                }, []));
            result.splice(0, 1);
            const send = { translations: result, url: url?.url() }
            //result.url = url?.url();
            console.log(send);
            api.send(send);
            await browser.close();
        }
    }
});


module.exports = router;
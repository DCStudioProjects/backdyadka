const express = require('express');
const router = express.Router();
const chromium = require('chrome-aws-lambda');
const axios = require('axios');
//const puppeteer = require('puppeteer')

router.get('/', async function (req, api) {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    /*const browser = await puppeteer.launch({
        headless: false
    });*/

    if (req.query.source === 'vcdn') {
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

    if (req.query.source === 'bazon') {
        const page = await browser.newPage();
        await page.goto(`https://bazon.dyadka.gq/?kp=${req.query.kp}&season=${req.query.season}&episode=${req.query.episode}`);
        await page.waitForSelector('iframe');
        await page.mouse.click(400, 300);
        await page.setDefaultTimeout(8000);
        const res = await page.waitForResponse(response => response.url().includes('index.m3u8'));
        const url = await res.url();
        const pages = await browser.pages();
        await Promise.all(pages.map(page => page.close()));
        await browser.close();
        const response = await axios.get(`https://bazon.cc/api/search?token=2848f79ca09d4bbbf419bcdb464b4d11&kp=${req.query.kp}`);
        const quality = Number(response.data?.results[0]?.max_qual)
        var arr = [];
        quality === 2160 && arr.push({ quality: quality, url: url.replace(/480/gi, quality) });
        quality >= 1080 && arr.push({ quality: 1080, url: url.replace(/480/gi, 1080) });
        quality >= 720 && arr.push({ quality: 720, url: url.replace(/480/gi, 720) });
        arr.push({ quality: 480, url: url });
        api.send({ urls: arr });
    }
});


module.exports = router;
//const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();
const chromium = require('chrome-aws-lambda');

router.get('/', async function (req, api) {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });
    
    const page = await browser.newPage();
    await page.goto(`https://38.svetacdn.in/DtnlpDk36lY6/tv-series/${req.query.id}?season=${req.query.season}&episode=${req.query.episode}`);
    await page.waitForSelector('input');
    await page.mouse.click(400, 300);
    const res = await page.waitForResponse(response => response.url().includes('.cloud.cdnland.in'));
    const url = await res.url();
    const result = `${url.substr(0, url.length - 25) + req.query.quality}.mp4`;
    api.send(result)
    await browser.close();
});


module.exports = router;
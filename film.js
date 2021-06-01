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
    const pageurl = req.query.type === 'tv_series' ? `https://38.svetacdn.in/DtnlpDk36lY6/tv-series/${req.query.id}?season=${req.query.season}&episode=${req.query.episode}&translation=${req.query.translation}` : `https://38.svetacdn.in/DtnlpDk36lY6/movie/${req.query.id}?translation=${req.query.translation}`;
    await page.goto(pageurl);
    await page.waitForSelector('input');
    await page.mouse.click(400, 300);
    const res = await page.waitForResponse(response => response.url().includes('seg-1-v1-a1.ts'));
    const url = await res.url();
    const result = url.substr(0, url.length - 26);
    api.send({ url: result, fullurl: url });
    await browser.close();
});


module.exports = router;
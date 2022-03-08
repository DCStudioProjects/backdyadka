import axios from 'axios';

require('dotenv').config();

const $category = axios.create({
  baseURL: process.env.KINOPOISKAPI,
  headers: {
    'X-API-KEY': process.env.KINOPOISKKEY,
  },
});

const $kpdata = axios.create({
  baseURL: process.env.KINOPOISKAPI,
  headers: {
    'X-API-KEY': process.env.KINOPOISKKEY,
  },
});

const $mediaData = axios.create({
  baseURL: process.env.MEDIA_API,
});

const $urlsData = axios.create({
  baseURL: process.env.PLAYER_API,
  headers: {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    Host: 'voidboost.net',
    Pragma: 'no-cache',
    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': 'Android',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Mobile Safari/537.36',
  },
});

export { $kpdata, $mediaData, $urlsData };

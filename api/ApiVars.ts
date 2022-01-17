import axios from "axios";
require("dotenv").config();

const $kpdata = axios.create({
  baseURL: process.env.KINOPOISKAPI,
  headers: {
    "X-API-KEY": process.env.KINOPOISKKEY,
  },
});

const $mediaData = axios.create({
  baseURL: process.env.MEDIA_API,
});

const $urlsData = axios.create({
  baseURL: process.env.PLAYER_API,
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    Host: "api.kholobok.biz",
    Pragma: "no-cache",
    Referer: "https://kholobok.biz/",
    "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Windows",
    "Sec-Fetch-Dest": "iframe",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-site",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
  },
});

export { $kpdata, $mediaData, $urlsData };

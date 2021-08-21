const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async function (req, api) {
  const { data } = await axios.get(
    `https://rezkance.com/series/comedy/${req.query.id}-teoriya-bolshogo-vzryva-2007.html`,
    {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "max-age=0",
        Connection: "keep-alive",
        Cookie:
          "dle_user_taken=1; dle_user_token=3590c8e8b68818e64a1c54288189afb9; _ym_uid=16230045491042370027; _ym_d=1623004549; _ga=GA1.2.1857658373.1625915394; _gid=GA1.2.1836983075.1629488381; _ym_isad=1; PHPSESSID=ap1c2e8ie42id2hs3d1vtrtf41; _ym_visorc=b",
        Host: "rezkance.com",
        Referer: "https://rezkance.com/",
        "sec-ch-ua":
          '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        "sec-ch-ua-mobile": "?0",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": 1,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      },
    }
  );

  const selector = cheerio.load(data);
  const title = selector("h1").text();
  const origtitle = selector(".b-post__origtitle").text();
  const base64 = selector(".b-post__info_rates.kp a").attr("href").substr(6);
  const buffer = Buffer.from(base64, "base64");
  const str = buffer.toString("utf-8");
  const kp_id = str.slice(40, -3);
  const ratings = {
    kinopoisk: selector(".b-post__info_rates.kp span.bold").text(),
    imdb: selector(".b-post__info_rates.imdb span.bold").text(),
  };
  const translations = selector(".b-translator__item")
    .map((i, x) => ({
      id: selector(x).attr("data-translator_id"),
      name: selector(x).attr("title"),
    }))
    .toArray();
  const seasons = selector(".b-simple_season__item")
    .map((i, x) => ({
      season: selector(x).attr("data-tab_id"),
      episodes: selector(
        `#simple-episodes-list-${selector(x).attr(
          "data-tab_id"
        )} .b-simple_episode__item`
      )
        .map((i, el) => selector(el).attr("data-episode_id"))
        .toArray(),
    }))
    .toArray();
  const activetrans = {
    id: selector(".b-translator__item.active").attr("data-translator_id"),
    name: selector(".b-translator__item.active").text(),
  };

  api.send({
    title,
    origtitle,
    kp_id,
    id: req.query.id,
    type: seasons.length ? "series" : "film",
    ratings,
    translations: { list: translations, active: activetrans },
    seasons,
  });
});

module.exports = router;

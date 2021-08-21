const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async function (req, api) {
  const { data } = await axios.get(
    `https://rezkance.com/series/comedy/${req.query.id}-teoriya-bolshogo-vzryva-2007.html`
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
  console.log({
    title,
    origtitle,
    kp_id,
    type: seasons.length ? "series" : "film",
    ratings,
    translations: { list: translations, active: activetrans },
    seasons,
  });
  api.send({
    title,
    origtitle,
    kp_id,
    type: seasons.length ? "series" : "film",
    ratings,
    translations: { list: translations, active: activetrans },
    seasons,
  });
});

module.exports = router;

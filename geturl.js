const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { domain, headers } = require("./globalStorage");
const { errorHandler } = require("./errorHandler");

router.get("/", async (req, api) => {
  try {
    const Translate = async () => {
      const rezkatranslate = (
        await axios.get(`http://f0561301.xsph.ru/?id=${req.query.id}`)
      ).data;
      const selector = cheerio.load(rezkatranslate);
      const translations = selector(".b-translator__item")
        .map((i, x) => ({
          id: selector(x).attr("data-translator_id"),
          name: selector(x).attr("title"),
        }))
        .toArray();

      const activeElem = selector(".b-translator__item.active");
      const active = {
        id: activeElem.attr("data-translator_id"),
        name: activeElem.attr("title"),
      };

      if (translations.length === 0) {
        var textNode = selector("body > script")
          .map((i, x) => x.children[0])
          .filter((i, x) => x && x.data.match(/sof.tv./))
          .get(0);
        const id = textNode.data.match(/\d+/g)[1];

        return { active: { id: id, name: "Оригинальный" } };
      } else {
        return { list: translations, active };
      }
    };

    const Urls = async () => {
      if (req.query.season !== undefined && req.query.episode !== undefined) {
        if (req.query.translation !== undefined) {
          const rezkaapi = await axios.post(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            new URLSearchParams({
              id: req.query.id,
              translator_id: req.query.translation,
              season: req.query.season,
              episode: req.query.episode,
              favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
              action: "get_stream",
            }),
            { headers }
          );
            console.log(rezkaapi)
          return rezkaapi.data;
        } else {
          const rezkaapi = await axios.post(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            new URLSearchParams({
              id: req.query.id,
              translator_id: (await Translate()).active.id,
              season: req.query.season,
              episode: req.query.episode,
              favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
              action: "get_stream",
            }),
            { headers }
          );

          return rezkaapi.data;
        }
      } else {
        if (req.query.translation !== undefined) {
          const rezkaapi = await axios.post(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            new URLSearchParams({
              id: req.query.id,
              translator_id: req.query.translation,
              favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
              action: "get_movie",
            }),
            { headers }
          );

          return rezkaapi.data;
        } else {
          const rezkaapi = await axios.post(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            new URLSearchParams({
              id: req.query.id,
              translator_id: (await Translate()).active.id,
              favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
              action: "get_movie",
            }),
            { headers }
          );

          return rezkaapi.data;
        }
      }
    };

    const urls = (await Urls()).url
      .split(",")
      .reverse()
      .reduce((acc, item) => {
        const [_, quality, url1, url2] = item.match(/\[(.+?)\](.+?) or (.+)/);
        acc.push({ quality: quality, urls: [url1, url2] });
        return acc;
      }, []);

    api.send({ urls });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

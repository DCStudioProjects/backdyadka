const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { domain, headers } = require("./globalStorage");
const { errorHandler } = require("./errorHandler");

router.post("/", async (req, api) => {
  const { id, translation, season, episode, slug } = req.body;
  try {
    const Translate = async () => {
      const response = await fetch(
        `${domain}/series/comedy/${id}-${slug}.html`,
        {
          method: "get",
          headers: headers.page,
        }
      );
      const data = await response.text();
      const selector = cheerio.load(data);
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

        return { active: { id, name: "Оригинальный" } };
      } else {
        return { list: translations, active };
      }
    };

    const Urls = async () => {
      if (season !== undefined && episode !== undefined) {
        if (translation !== undefined) {
          const response = await fetch(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            {
              method: "post",
              body: new URLSearchParams({
                id,
                translator_id: translation,
                season,
                episode,
                action: "get_stream",
              }),
              headers: headers.api,
            }
          );
          const data = await response.json();
          return data;
        } else {
          const response = await fetch(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            {
              method: "post",
              body: new URLSearchParams({
                id,
                translator_id: (await Translate()).active.id,
                season,
                episode,
                action: "get_stream",
              }),
              headers: headers.api,
            }
          );
          const data = await response.json();
          return data;
        }
      } else {
        if (translation !== undefined) {
          const response = await fetch(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            {
              method: "post",
              body: new URLSearchParams({
                id,
                translator_id: translation,
                action: "get_movie",
              }),
              headers: headers.api,
            }
          );
          const data = await response.json();
          return data;
        } else {
          const response = await fetch(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            {
              method: "post",
              body: new URLSearchParams({
                id,
                translator_id: (await Translate()).active.id,
                action: "get_movie",
              }),
              headers: headers.api,
            }
          );
          const data = await response.json();
          return data;
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

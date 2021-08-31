const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { domain, headers } = require("./globalStorage");
const { errorHandler } = require("./errorHandler");

router.post("/", async (req, api) => {
  const { id, slug } = req.body;

  if (id && slug) {
    try {
      const response = await fetch(
        `${domain}/series/comedy/${id}-${slug}.html`,
        {
          method: "get",
          headers: headers.page,
        }
      );
      const data = await response.text();
      const selector = cheerio.load(data);
      const title = selector("h1").text();
      const origtitle = selector(".b-post__origtitle").text();
      const base64 = selector(".b-post__info_rates.kp a")
        .attr("href")
        .substr(6);
      const buffer = Buffer.from(base64, "base64");

      const str = buffer.toString("utf-8");

      const kp_id = Number(str.slice(40, -3));

      const ratings = {
        kinopoisk: Number(
          selector(".b-post__info_rates.kp span.bold").text()
        ).toFixed(1),
        imdb: selector(".b-post__info_rates.imdb span.bold").text(),
      };

      const translations = selector(".b-translator__item")
        .map((i, x) => ({
          id: Number(selector(x).attr("data-translator_id")),
          name: selector(x).attr("title"),
        }))
        .toArray();

      const seasons = selector(".b-simple_season__item")
        .map((i, x) => ({
          season: Number(selector(x).attr("data-tab_id")),
          episodes: selector(
            `#simple-episodes-list-${selector(x).attr(
              "data-tab_id"
            )} .b-simple_episode__item`
          )
            .map((i, el) => Number(selector(el).attr("data-episode_id")))
            .toArray(),
        }))
        .toArray();

      const activetrans = {
        id: Number(
          selector(".b-translator__item.active").attr("data-translator_id")
        ),
        name: selector(".b-translator__item.active").text(),
      };

      const year = selector(".b-post__info tr:nth-child(4) a")
        .text()
        .substring(0, 4);

      const age = selector(".b-post__info tr:nth-child(9) .bold").text();

      const country = selector(".b-post__info tr:nth-child(5) a").text();

      const genres = selector(".b-post__info tr:nth-child(7) td:nth-child(2)")
        .text()
        .toLowerCase();

      api.send({
        age,
        country,
        genres,
        id: Number(id),
        kp_id,
        origtitle,
        ratings,
        serial: seasons.length ? true : false,
        title,
        translations: { list: translations, default: activetrans },
        seasons,
        year,
      });
    } catch (e) {
      errorHandler(e, api);
    }
  } else {
    api.send({ comment: "Required data are not provided" });
  }
});

module.exports = router;

const router = require("express").Router();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { domain, headers } = require("../config/globalStorage");
const { errorHandler } = require("../errorHandler");
const { tileHeader, ajaxHeader } = require("../config/dynamicParams.js");

router.post("/film", async (req, api) => {
  const { data } = req.body;
  if (data) {
    const buffer = Buffer.from(data, "base64");
    const slug = buffer.toString();
    const urlreg = /(\d*?)\-/g;
    const id = urlreg.exec(slug)[1];

    try {
      const response = await fetch(`${domain}${slug}.html`, {
        method: "get",
        headers: headers.page,
      });
      const data = await response.text();

      const selector = cheerio.load(data);
      const title = selector("h1").text();
      const origtitle = selector(".b-post__origtitle").text();
      const base64 =
        selector(".b-post__info_rates.kp a").attr("href")?.substr(6) || "";
      const buffer = Buffer.from(base64, "base64");

      const str = buffer.toString("utf-8");

      const kp_id = Number(str.slice(40, -3));

      const ratings = {
        kinopoisk: Number(
          selector(".b-post__info_rates.kp span.bold").text()
        ).toFixed(1),
        imdb: selector(".b-post__info_rates.imdb span.bold").text(),
      };

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

      const series = seasons.length ? true : false;

      const translations = selector(".b-translator__item")
        .map((i, x) => ({
          id: Number(selector(x).attr("data-translator_id")),
          name: selector(x).attr("title"),
          params: !series
            ? {
                is_camrip: selector(x).attr("data-camrip"),
                is_ads: selector(x).attr("data-ads"),
                is_director: selector(x).attr("data-director"),
              }
            : null,
        }))
        .toArray();
      const initdata = selector("body > script")
        .map((i, x) => x.children[0])
        .filter((i, x) => x && x.data.match(/sof.tv./))
        .get(0);

      const urlsdecoder = /\\\//g;
      const media = [];

      if (!series) {
        const urlsreg = /(\[\d+p\s?\w*].*?)"?,/g;
        const qualities = ["240p", "360p", "480p", "720p", "1080p"];
        const urls = initdata.data.matchAll(urlsreg);
        var key = 0;

        for (const item of urls) {
          const urlreg = /\[.+?](.+?) or (.+?mp4)/g;
          const url = item[1];
          const found = urlreg.exec(url);
          media.push({
            quality: qualities[key],
            urls: [
              found[1].replaceAll(urlsdecoder, "/"),
              found[2].replaceAll(urlsdecoder, "/"),
            ],
          });
          key++;
        }
      }

      const tid = initdata.data.match(/\d+/g)[1];
      const inittrans = {
        id: Number(tid),
        name:
          selector(`.b-translator__item[data-translator_id=${tid}]`).text() ||
          "Оригинальный",
      };

      var params = "";
      if (!series) {
        if (translations.length > 0) {
          params = {
            is_camrip: selector(".b-translator__item.active").attr(
              "data-camrip"
            ),
            is_ads: selector(".b-translator__item.active").attr("data-ads"),
            is_director: selector(".b-translator__item.active").attr(
              "data-director"
            ),
          };
        }
      }
      const activetrans = {
        id: Number(
          selector(".b-translator__item.active").attr("data-translator_id")
        ),
        params,
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

      const token = selector("#ctrl_favs").attr("value");

      api.send({
        age,
        country,
        genres,
        id: Number(id),
        kp_id,
        media: media.length > 0 ? media.reverse() : null,
        origtitle,
        ratings,
        series,
        slug,
        title,
        token,
        translations: { list: translations, default: inittrans },
        seasons,
        year,
      });

      const tilereg = /thumbnails":"(.+?),/g;
      const tileurl = tilereg
        .exec(initdata.data)[1]
        .replaceAll(urlsdecoder, "/");

      const tiles = await fetch(domain + tileurl, {
        method: "get",
        headers: tileHeader(slug),
      });

      const tile = await tiles.text();

      const body = new URLSearchParams({
        action: "add",
        id: Number(id),
        translator_id: tid,
      });

      const ajax = await fetch(
        `${domain}/ajax/send_watching/?t=${Date.now()}`,
        {
          method: "post",
          body: new URLSearchParams({
            action: "add",
            id: Number(id),
            translator_id: tid,
          }),
          headers: ajaxHeader(body.toString().length, slug),
        }
      );

      const send = await ajax.text();
    } catch (e) {
      errorHandler(e, api);
    }
  } else {
    api.send({ comment: "Required data are not provided" });
  }
});

module.exports = router;

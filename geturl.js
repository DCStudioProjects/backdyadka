const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { domain } = require("./globalStorage");
const { errorHandler } = require("./errorHandler");
const { apiHeader } = require("./dynamicParams.js");

router.post("/", async (req, api) => {
  const { source, translation, season, episode, hash, token } = req.body;
  if (source && translation && token) {
    const buffer = Buffer.from(source, "base64");
    const slug = buffer.toString();
    const urlreg = /(\d*?)\-/g;
    const id = urlreg.exec(slug)[1];

    try {
      const Urls = async () => {
        if (season && episode) {
          const body = new URLSearchParams({
            id,
            translator_id: translation,
            season,
            episode,
            favs: token,
            action: "get_stream",
          });

          const response = await fetch(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            {
              method: "post",
              body,
              headers: apiHeader(body.toString().length, slug),
            }
          );
          const data = await response.json();
          return data;
        } else if (hash) {
          const buffer = Buffer.from(hash, "base64");
          const { is_camrip, is_ads, is_director } = JSON.parse(
            buffer.toString()
          );

          const body = new URLSearchParams({
            id,
            translator_id: translation,
            is_camrip,
            is_ads,
            is_director,
            favs: token,
            action: "get_movie",
          });

          const response = await fetch(
            `${domain}/ajax/get_cdn_series/?t=${Date.now()}`,
            {
              method: "post",
              body,
              headers: apiHeader(body.toString().length, slug),
            }
          );
          const data = await response.json();
          return data;
        } else {
          api.send({ comment: "Required data are not provided" });
        }
      };

      const media = (await Urls()).url
        .split(",")
        .reverse()
        .reduce((acc, item) => {
          const [_, quality, url1, url2] = item.match(/\[(.+?)\](.+?) or (.+)/);
          acc.push({ quality: quality, urls: [url1, url2] });
          return acc;
        }, []);

      api.send({ media });
    } catch (e) {
      errorHandler(e, api);
    }
  } else {
    api.send({ comment: "Required data are not provided" });
  }
});

module.exports = router;

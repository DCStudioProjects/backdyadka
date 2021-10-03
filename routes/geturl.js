const router = require("express").Router();
const fetch = require("node-fetch");
const { domain } = require("../config/globalStorage");
const { errorHandler } = require("../errorHandler");
const { apiHeader } = require("../config/dynamicParams.js");

router.post("/geturl", async (req, api) => {
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

      const sources = (await Urls()).url;

      const media = [];
      const qualities = ["240p", "360p", "480p", "720p", "1080p"];
      const urls = sources.split(",");
      urls.map((item, key) => {
        const urlreg = /\[.+?]http(.+?) or http(.+?mp4)/g;
        const found = urlreg.exec(item);
        media.push({
          quality: qualities[key],
          urls: [`https${found[1]}`, `https${found[2]}`],
        });
      });

      api.send({ media: media.reverse() });
    } catch (e) {
      errorHandler(e, api);
    }
  } else {
    api.send({ comment: "Required data are not provided" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const querystring = require("querystring");

router.get("/", async (req, api) => {
  try {
    const headers = {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      Connection: "keep-alive",
      "Content-Length": 102,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Cookie:
        "dle_user_taken=1; dle_user_token=3590c8e8b68818e64a1c54288189afb9; _ym_uid=16230045491042370027; _ym_d=1623004549; _ga=GA1.2.1857658373.1625915394; _gid=GA1.2.1836983075.1629488381; _ym_isad=1; PHPSESSID=ap1c2e8ie42id2hs3d1vtrtf41; _ym_visorc=w",
      Host: "rezkance.com",
      Origin: "https://rezkance.com",
      "sec-ch-ua":
        '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      "sec-ch-ua-mobile": "?0",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
    };
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
            "http://rezkance.com/ajax/get_cdn_series/",
            querystring.stringify(
              {
                id: req.query.id,
                translator_id: req.query.translation,
                season: req.query.season,
                episode: req.query.episode,
                favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
                action: "get_stream",
              },
              { headers }
            )
          );
          return rezkaapi.data;
        } else {
          const rezkaapi = await axios.post(
            "http://rezkance.com/ajax/get_cdn_series/",
            querystring.stringify(
              {
                id: req.query.id,
                translator_id: (await Translate()).active.id,
                season: req.query.season,
                episode: req.query.episode,
                favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
                action: "get_stream",
              },
              { headers }
            )
          );
          return rezkaapi.data;
        }
      } else {
        if (req.query.translation !== undefined) {
          const rezkaapi = await axios.post(
            "http://rezkance.com/ajax/get_cdn_series/",
            querystring.stringify(
              {
                id: req.query.id,
                translator_id: req.query.translation,
                favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
                action: "get_movie",
              },
              { headers }
            )
          );
          return rezkaapi.data;
        } else {
          const rezkaapi = await axios.post(
            "http://rezkance.com/ajax/get_cdn_series/",
            querystring.stringify(
              {
                id: req.query.id,
                translator_id: (await Translate()).active.id,
                favs: "7e428a91-9487-4404-b977-ac22b15c4e2f",
                action: "get_movie",
              },
              { headers }
            )
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

    api.send({ urls: urls });
  } catch (err) {
    api.send({ err: err });
  }
});

module.exports = router;

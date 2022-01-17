import axios from "axios";
import { $mediaData, $urlsData } from "../api/ApiVars";

const router = require("express").Router();
const fetch = require("node-fetch");
const { domain } = require("../config/globalStorage");
const { errorHandler } = require("../errorHandler");
const { apiHeader } = require("../config/dynamicParams.js");
const puppeteer = require("puppeteer");

router.post("/geturl", async (req, api) => {
  try {
    const { isSeries, kpId, translation } = req.body;
    if (isSeries) {
      const { episode, season } = req.body;
      const { data } = await $urlsData.get(`/${kpId}`);
      const regexSeasons = /var seasons_episodes = (.*)\;/;
      const playlist = regexSeasons.exec(data)[1];
      const regexUrls = /\[.+?](.+?) or (.+?mp4)/g;
      const urls = regexUrls.exec(data);
      console.log(urls);
      api.send({ playlist });
    } else {
      const { data } = await $urlsData.get(`/${kpId}`);
    }

    /*const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage(); //новая вкладка
    await page.goto(
      `https://voidboost.net/embed/306084?s=1&e=1&h=voidboost.net`
    );

    //await page.waitForSelector("Селектор последнего DOM-элемента");
    await page.mouse.click(400, 300); //в моём случае нужен был клик
    const res = await page.waitForResponse((response) =>
      response.url().includes("m3u8")
    );
    const url = await res.url(); //вынимаем ссылку
    console.log(url); //здесь я отправлял результат в API, можно сделать любой вывод
    await browser.close();

    /*if (source && translation && token) {
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
        const urlreg = /\[.+?]https(.+?) or https(.+?mp4)/g;
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
  }*/
    api.send({ url });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

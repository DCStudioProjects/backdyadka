const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { errorHandler } = require("./errorHandler");
const { domain, headers } = require("./globalStorage");
const fetch = require("node-fetch");

router.post("/", async (req, api) => {
  const { query } = req.body;
  try {
    const response = await fetch(
      `${domain}/search?do=search&subaction=search&q=${encodeURIComponent(
        query
      )}`,
      {
        method: "get",
        headers: headers.page,
      }
    );
    const data = await response.text();
    const selector = cheerio.load(data);

    const titles = selector(".b-content__inline_item-link a")
      .map((i, x) => selector(x).text())
      .toArray();

    const ids = selector(".b-content__inline_item")
      .map((i, x) => selector(x).attr("data-id"))
      .toArray();

    const images = selector(".b-content__inline_item-cover img")
      .map((i, x) => selector(x).attr("src"))
      .toArray();

    const result = ids.map((res, key) => ({
      id: ids[key],
      title: titles[key],
      poster: images[key],
    }));

    api.send({ search: result });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

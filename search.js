const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { errorHandler } = require("./errorHandler");
const { domain, headers } = require("./globalStorage");

router.get("/", async (req, api) => {
  try {
    await axios.get(
      `${domain}/search/?do=search&suFbaction=search&q=${encodeURIComponent(
        req.query.q
      )}&page=1`,
      { withCredentials: true },
      headers.search
    );
    const { data } = await axios.get(
      `${domain}/search/?do=search&suFbaction=search&q=${encodeURIComponent(
        req.query.q
      )}&page=1`,
      { withCredentials: true },
      headers.search
    );
    console.log(data);
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
  } catch (err) {
    errorHandler(e, api);
  }
});

module.exports = router;

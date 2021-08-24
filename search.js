const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async (req, api) => {
  try {
    const search = (
      await axios.get(
        `http://f0561301.xsph.ru/search.php?q=${encodeURIComponent(
          req.query.q
        )}`
      )
    ).data;

    const selector = cheerio.load(search);

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

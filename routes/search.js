const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { errorHandler } = require("../errorHandler");
const { domain, headers } = require("../config/globalStorage");
const fetch = require("node-fetch");

router.post("/search", async (req, api) => {
  const { q } = req.body;
  try {
    const response = await fetch(
      `${domain}/search/?do=search&subaction=search&q=${encodeURIComponent(q)}`,
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

    const slugs = selector(".b-content__inline_item-cover a")
      .map((i, x) => selector(x).attr("href"))
      .toArray();

    const result = ids.map((res, key) => {
      const slugreg = /\.\w{2,3}(\/.+?).html/g;
      return {
        id: ids[key],
        title: titles[key],
        poster: images[key],
        slug: slugreg.exec(slugs[key])[1],
      };
    });

    api.send({ search: result });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

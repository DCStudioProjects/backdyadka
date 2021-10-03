const router = require("express").Router();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { errorHandler } = require("../errorHandler");
const { domain, headers } = require("../config/globalStorage");

router.get("/categories", async (req, api) => {
  try {
    const response = await fetch(
      `${domain}/films/page/1/?filter=${req.query.category}`,
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

    api.send({ results: result });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

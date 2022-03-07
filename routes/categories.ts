const router = require("express").Router();
const cheerio = require("cheerio");
const { errorHandler } = require("../errorHandler");
const { domain, headers } = require("../config/globalStorage");
import { $kpdata } from "../api/ApiVars";

router.get("/categories", async (req, api) => {
  try {
    const { category } = req.body;
    // const { data: rawData } = await $kpdata.get(
    //   `/v2.2/films?order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${encodeURIComponent(
    //     category
    //   )}&page=1`
    // );

    // const result = ids.map((res, key) => {
    //   const slugreg = /\.\w{2,3}(\/.+?).html/g;
    //   return {
    //     id: ids[key],
    //     title: titles[key],
    //     poster: `https://cdn.statically.io/img/static.hdrezka.ac/f=auto,q=60/${images[
    //       key
    //     ].substring(25)}`,
    //     slug: slugreg.exec(slugs[key])[1],
    //   };
    // });

    api.send({ results: "result" });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

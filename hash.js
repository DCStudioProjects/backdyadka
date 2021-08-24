const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { domain, headers } = require("./globalStorage");
const { errorHandler } = require("./errorHandler");

router.get("/", async (req, api) => {
  try {
    const { data } = await axios.get(
      `${domain}/series/comedy/${req.query.id}-teoriya-bolshogo-vzryva-2007.html`
    );

    const selector = cheerio.load(data);
    const hash = selector("#ctrl_favs").attr("value");
    const ajax = await axios.post(
      `${domain}/ajax/send_watching/?t=${Date.now()}`,
      new URLSearchParams({
        action: "add",
        id: req.query.id,
        translator_id: req.query.translation,
      }),
      { headers }
    );
    api.send({ hash, success: ajax.data.success });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

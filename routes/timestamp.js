const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const InfoModel = require("../models/InfoModel");
const { timestampValidation } = require("../validators/validation");

router.post("/timestamp", authMiddleware, async (req, res) => {
  const { action, email, id, season, episode, time, translation, quality } =
    req.body;
  const { error } = timestampValidation(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  if (action === "get") {
    var info = await InfoModel.findOne({ email });
    if (!info) {
      info = await InfoModel.create({ email });
      return res.send({
        success: false,
      });
    }

    const result = info.timestamps.toObject().find((x) => x.id === id);

    if (result) {
      return res.send({
        success: true,
        info: result,
      });
    } else {
      return res.send({
        success: false,
      });
    }
  }

  if (action === "add") {
    if (
      !id ||
      time === undefined ||
      !email ||
      !translation ||
      quality === undefined
    ) {
      return res.status(400).send({
        success: false,
        message: "Необходимая информация не была направлена в запрос",
      });
    }

    var info = await InfoModel.findOne({ email });
    if (!info) {
      info = await InfoModel.create({ email });
    }

    const duplicate = info.timestamps.findIndex((x) => x.id === id);

    if (season && episode) {
      duplicate !== -1
        ? (info.timestamps[duplicate] = {
            id,
            season,
            episode,
            time,
            translation,
            quality,
          })
        : info.timestamps.push({
            id,
            season,
            episode,
            time,
            translation,
            quality,
          });
    } else {
      duplicate !== -1
        ? (info.timestamps[duplicate] = { id, time, translation, quality })
        : info.timestamps.push({ id, time, translation, quality });
    }

    await info.save();
    return res.send({
      success: true,
    });
  }

  if (!action) {
    return res.status(400).send({
      success: false,
      message: "Необходимая информация отсутствует в теле запроса",
    });
  }
});

module.exports = router;

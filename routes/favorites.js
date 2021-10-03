const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const InfoModel = require("../models/InfoModel");
const { favoritesValidation } = require("../validators/validation");

router.post("/favorites", authMiddleware, async (req, res) => {
  const { action, email, id, poster, title, slug } = req.body;

  const { error } = favoritesValidation(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  if (action === "get") {
    const data = await InfoModel.findOne({ email });
    if (!data) {
      await InfoModel.create({ email });
      return res.send({
        success: true,
        message: "Пока здесь ничего нет :)",
      });
    }

    if (data.favorites.length > 0) {
      return res.send({ success: true, favorites: data.favorites });
    }

    return res.send({ success: true, message: "Пока здесь ничего нет :)" });
  }
  if (id) {
    if (action === "check") {
      const data = await InfoModel.findOne({ email });
      if (!data) {
        await InfoModel.create({ email });
        return res.send({ success: true, exists: false });
      }
      const exists = data.favorites.find((x) => x.id === id);

      if (exists) {
        return res.send({ success: true, exists: true });
      } else {
        return res.send({ success: true, exists: false });
      }
    }

    if (action === "add") {
      if (poster && title && slug) {
        var data = await InfoModel.findOne({ email });
        if (!data) {
          data = await InfoModel.create({ email });
        }
        const duplicate = data.favorites.find((x) => x.id === id);
        if (!duplicate) {
          data.favorites.push({ id, poster, title, slug });
          await data.save();
          return res.send({ success: true });
        }
        return res.send({ success: false });
      }
      return res.status(400).send({ success: false });
    }

    if (action === "remove") {
      var data = await InfoModel.findOne({ email });
      if (!data) {
        data = await InfoModel.create({ email });
      }
      const exists = data.favorites.findIndex((x) => x.id === id);
      if (exists !== -1) {
        data.favorites.splice(exists, 1);
        await data.save();
        return res.send({ success: true, data: data.favorites });
      }
      return res.send({
        success: false,
        message: "Элемент не был найден в избранном",
      });
    }
    return res.status(400).send({
      success: false,
      message: "Необходимая информация отсутствует в теле запроса",
    });
  }

  return res.status(400).send({
    success: false,
    message: "Необходимая информация отсутствует в теле запроса",
  });
});

module.exports = router;

const router = require("express").Router();
const UserModel = require("../models/UserModel");
const { checkUserValidation } = require("../validators/validation");

router.post("/checkuser", async (req, res) => {
  const { error } = checkUserValidation(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  const { email } = req.body;

  if (email) {
    const result = await UserModel.findOne({ email });
    if (result) {
      return res.send({ success: true, registered: true });
    }

    return res.send({ success: true, registered: false });
  }

  return res.send({
    success: false,
    message: "Необходимая информация отсутствует в теле запроса",
  });
});

module.exports = router;

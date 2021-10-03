const router = require("express").Router();
const UserModel = require("../models/UserModel");
const { activationValidation } = require("../validators/validation");

router.get("/activate/:link", async (req, res) => {
  const activationLink = req.params.link;
  const email = req.query.email;

  const { error } = activationValidation({ email, activationLink });
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  const user = await UserModel.findOne({ activationLink });
  if (!user && !user.isActivated) {
    return res.redirect(
      `${process.env.CLIENT_URL}?verificationStatus=expired&email=${email}`
    );
  }

  if (user.isActivated) {
    return res.redirect(
      `${process.env.CLIENT_URL}?verificationStatus=already&email=${email}`
    );
  }

  user.isActivated = true;
  await user.save();
  res.redirect(`${process.env.CLIENT_URL}?verificationStatus=verified`);
});

module.exports = router;

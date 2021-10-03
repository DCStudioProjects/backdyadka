const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const UserModel = require("../models/UserModel");
const mailService = require("../services/mailService");
const tokenService = require("../services/tokenService");
const { registerValidation } = require("../validators/validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  const { firstname, email, password } = req.body;

  const emailExist = await UserModel.findOne({ email });

  if (emailExist) {
    return res.status(400).send({
      success: false,
      message: "Пользователь с таким email уже был зарегистрирован",
    });
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  const activationLink = uuid.v4();
  const user = await UserModel.create({
    firstname,
    email,
    password: hashPassword,
    activationLink,
  });

  const { refreshToken } = tokenService.generateTokens({ id: user._id, email });

  await mailService.sendActivationMail(
    email,
    `${process.env.API_URL}/activate/${activationLink}?email=${email}`
  );

  await tokenService.saveToken(user._id, refreshToken);

  try {
    res.send({
      success: true,
      message: `На почту ${email} было выслано письмо с инструкциями по активации аккаунта`,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

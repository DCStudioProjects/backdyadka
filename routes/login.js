const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/tokenService");
const { loginValidation } = require("../validators/validation");

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "Пользователь с таким email не зарегистрирован",
    });
  }

  const validPass = bcrypt.compareSync(password, user.password);

  if (!validPass) {
    return res.status(400).send({
      success: false,
      message: "Неверный email или пароль",
    });
  }

  if (!user.isActivated) {
    return res.status(400).send({
      success: false,
      message:
        "Ваш аккаунт не активирован. При регистрации Вам были отправлены инструкции по активации аккаунта на почту.",
    });
  }
  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user._id,
    email,
    isActivated: user.isActivated,
  });

  await tokenService.saveToken(user._id, refreshToken);

  return res
    .cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .send({
      success: true,
      accessToken,
      refreshToken,
      user: { id: user._id, email, firstname: user.firstname },
    });
});

module.exports = router;

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const tokenModel = require("../models/TokenModel");
const UserModel = require("../models/UserModel");
const tokenService = require("../services/tokenService");

router.get("/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(401)
      .send({ success: false, message: "Пользователь не авторизован" });
  }
  const tokenData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  if (!tokenData) {
    return res
      .status(400)
      .send({ success: false, message: "1Истёк срок действия токена" });
  }

  const tokenFromDb = await tokenModel.findOne({ refreshToken });
  if (!tokenFromDb) {
    return res
      .status(400)
      .send({ success: false, message: "2Истёк срок действия токена" });
  }

  const userData = (
    await UserModel.findOne({ email: tokenData.email })
  ).toObject();

  const payload = {
    email: userData.email,
    id: userData.id,
    isActivated: userData.isActivated,
  };
  const { accessToken } = tokenService.generateTokens(payload);
  return res.send({
    success: true,
    accessToken,
    user: { firstname: userData.firstname, email: userData.email },
  });
});

module.exports = router;

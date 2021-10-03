const router = require("express").Router();
const tokenModel = require("../models/TokenModel");
const tokenService = require("../services/tokenService");

router.get("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await tokenModel.deleteOne({ refreshToken });
    res.clearCookie("refreshToken");
    return res.send({ success: true });
  } catch (err) {
    return res.send({ success: false, message: err });
  }
});

module.exports = router;

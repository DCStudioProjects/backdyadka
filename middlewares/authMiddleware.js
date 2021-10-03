const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Пользователь не авторизован" });
  }

  try {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ success: false, message: "Пользователь не авторизован" });
  }
};

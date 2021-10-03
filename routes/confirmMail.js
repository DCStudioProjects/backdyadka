const router = require("express").Router();
const UserModel = require("../models/UserModel");

router.post("/confirm", async (req, res) => {
  const { email } = req.body;
  const activationLink = uuid.v4();
  const user = await UserModel.updateOne(
    { email },
    { $set: { activationLink } }
  );
  console.log(user);
  res.send({ success: true });
});

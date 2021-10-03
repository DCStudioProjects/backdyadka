const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);

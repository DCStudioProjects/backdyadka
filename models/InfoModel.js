const { Schema, model } = require("mongoose");

const infoSchema = new Schema({
  email: { type: String, required: true, unique: true },
  favorites: [
    {
      id: { type: Number, required: true, unique: true },
      poster: { type: String, required: true },
      title: { type: String, required: true },
      slug: { type: String, required: true },
    },
  ],
  history: [
    {
      id: { type: Number, required: true, unique: true },
      poster: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
  timestamps: [
    {
      id: { type: Number, required: true, unique: true },
      season: { type: Number },
      episode: { type: Number },
      time: { type: Number, required: true },
      translation: { type: Number, required: true },
      quality: { type: Number, required: true },
    },
  ],
});

module.exports = model("Info", infoSchema);

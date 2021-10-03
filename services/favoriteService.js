const InfoModel = require("../models/InfoModel");

class InfoService {
  async addFavorite(email, id, poster, title, url) {
    const add = await InfoModel.updateOne(
      { email },
      {
        $addToSet: {
          favorites: {
            id,
            poster,
            title,
            url,
          },
        },
      }
    );
    console.log(add);

    return { success: true };
  }

  async getFavorite(email) {
    const { favorites } = await InfoModel.findOne({ email });
    return { favorites };
  }

  async checkFavorite(email, id) {
    const infoData = await InfoModel.findOne({ email });
    if (infoData) {
      const favorites = await InfoModel.find({
        favorites: { $elemMatch: { id: { $gte: id } } },
      });

      if (favorites.length === 0) {
        return { success: true, exists: false };
      }

      if (favorites.length > 0) {
        return { success: true, exists: true };
      }
    }
  }

  async removeFavorite(email, id) {
    const remove = await InfoModel.updateOne(
      { email },
      {
        $pull: {
          favorites: { id },
        },
      },
      { safe: true }
    );
    console.log(remove);
    return { success: true };
  }

  async addTimestamp(email, id, season, episode, time) {
    const ts = await InfoModel.updateOne(
      { "timestamps.id": id },
      {
        $set: {
          "timestamps.season": season,
          "timestamps.episode": episode,
          "timestamps.time": time,
        },
      }
    );
    console.log(ts);
  }
}

module.exports = new InfoService();

import express, { Request, Response } from "express";
import { $mediaData } from "../api/ApiVars";
import { errorHandler } from "../errorHandler";
import { searchDTO } from "../dtos/searchDTO";

const router = express.Router();

router.post("/search", async (req: Request, api: Response) => {
  const { query } = req.body;
  try {
    const title = query ? `&title=${encodeURIComponent(query)}` : "";
    const { data: rawData } = await $mediaData.get(
      `/search?account_key=${process.env.MEDIA_KEY}${title}`
    );
    const data = rawData.result
      ?.filter((item) => {
        if (item.kinopoisk_id) {
          return item;
        }
      })
      .map((item) => {
        const result = searchDTO(item);
        return result;
      });
    api.send({
      data: data || [],
      defaultPoster:
        "https://cdn.statically.io/img/i.pinimg.com/f=auto,q=60,h=300/originals/42/2f/83/422f83814d816e55ce6a633f35ec63a4.jpg",
    });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

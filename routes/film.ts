import express, { Request, Response } from "express";
import { FilmBody } from "../interfaces/IFilm";
import { errorHandler } from "../errorHandler";
import {
  getData,
  getMediaData,
  getSeasons,
  getSimilars,
  getStaff,
} from "../services/filmService";

const router = express.Router();

router.post("/film", async (req: Request, api: Response) => {
  try {
    const { kpId: userkpId }: FilmBody = req.body;
    const data = await getData(userkpId);
    const {
      age,
      countries,
      description,
      genres,
      isSeries,
      kpId,
      origTitle,
      ratings,
      title,
      year,
    } = data;
    const { translations } = await getMediaData(kpId);
    const posterBig = `https://cdn.statically.io/img/blackmedia.top/f=auto,q=50/media/${kpId}/wide_app_cinema_media_${kpId}.jpg`;
    const seasons = isSeries ? await getSeasons(kpId) : null;
    const similars = await getSimilars(kpId);
    const staff = await getStaff(kpId);

    api.send({
      age,
      countries,
      description,
      genres,
      isSeries,
      kpId,
      origTitle,
      posterBig,
      ratings,
      seasons,
      similars,
      staff,
      title,
      translations,
      year,
    });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

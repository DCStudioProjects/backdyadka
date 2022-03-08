import express, { Request, Response } from 'express';
import { errorHandler } from '../errorHandler';
import { $kpdata } from '../api/ApiVars';
import { categories } from '../constants/endpoints';
import { kpListDTO } from '../dtos/kpListDTO';

const router = express.Router();

router.get('/categories', async (req: Request, api: Response) => {
  try {
    const category = req.query.category.toString();
    const { data: rawData } = await $kpdata.get(`/v2.2/films${categories[category]}&page=1`);
    const data = kpListDTO(rawData.films);
    api.send({ data });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

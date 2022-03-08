import express, { Request, Response } from 'express';
import { $kpdata } from '../api/ApiVars';
import { errorHandler } from '../errorHandler';
import { kpListDTO } from '../dtos/kpListDTO';
import { blankSearch } from '../constants/blankRequests';

const router = express.Router();

router.post('/search', async (req: Request, api: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      const data = blankSearch;
      return api.send({
        data,
      });
    }

    const { data: rawData } = await $kpdata.get(
      `/v2.2/films?order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${encodeURIComponent(
        query
      )}&page=1`
    );
    const data = kpListDTO(rawData.items);

    return api.send({
      data,
    });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

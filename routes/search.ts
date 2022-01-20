import express, {Request, Response} from 'express';
import {$kpdata} from '../api/ApiVars';
import {errorHandler} from '../errorHandler';
import {searchDTO} from '../dtos/searchDTO';

const router = express.Router();

router.post('/search', async (req: Request, api: Response) => {
  try {
    const {query} = req.body;
    const {data: rawData} = await $kpdata.get(
      `/v2.2/films?order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${encodeURIComponent(query)}&page=1`
    );
    const data = rawData.items.map((item) => {
      const result = searchDTO(item);
      return result;
    });
    api.send({
      data,
    });
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

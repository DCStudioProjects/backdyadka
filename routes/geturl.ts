import express, {Request, Response} from 'express';
import {errorHandler} from '../errorHandler';
import {decodeUrl, getUrl} from '../services/urlService';

const router = express.Router();

router.post('/geturl', async (req: Request, api: Response) => {
  try {
    const {episode, isSeries, kpId, season, translation} = req.body;
    if (kpId && translation) {
      const {playlist, urlRaw} = await getUrl(isSeries, episode, season, kpId, translation);
      const urls = decodeUrl(urlRaw);
      api.send({playlist, urls});
    } else {
      api.send({comment: 'Required data are not provided'});
    }
  } catch (e) {
    errorHandler(e, api);
  }
});

module.exports = router;

import {$urlsData} from '../api/ApiVars';
import urlDecoder from './decodeService';

export const getUrl = async (isSeries: boolean, episode: string, season: string, kpId: string, translation: string) => {
  const {data} = await $urlsData.get(isSeries ? `/${kpId}?s=${season}&e=${episode}&t=${translation}&h=baskino.me` : `/${kpId}?t=${translation}&h=baskino.me`);
  const regexUrls = /'file': '(.*)'/;
  const urlRaw = regexUrls.exec(data)[1];
  return {urlRaw}
};

export const decodeUrl = (url: string) => {
  const config = {
    file: url,
    default_quality: '480p',
  };
  const urlsRaw = urlDecoder(config)
  const urlsSplitted = urlsRaw.split(',');
  const qualities = ['240p', '360p', '480p', '720p', '1080p'];
  const urls = urlsSplitted.map((item, key) => {
    const urlreg = /\[.+?]https(.+?) or https(.+?mp4)/g;
    const found = urlreg.exec(item);
    return {
      quality: qualities[key],
      streams: [`https${found[1]}`, `https${found[2]}`],
    };
  });
  return urls;
};
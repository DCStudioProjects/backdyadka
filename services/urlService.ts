import {$urlsData} from '../api/ApiVars';
import urlDecoder from './decodeService';

export const getUrl = async (isSeries: boolean, episode: string, season: string, kpId: string, translation: string) => {
  if (isSeries) {
    const {data} = await $urlsData.get(`/${kpId}?s=${season}&e=${episode}&h=baskino.me`);
    const regexSeasons = /var seasons_episodes = (.*);/;
    const playlistRaw = regexSeasons?.exec(data)[1];
    const playlist = JSON.parse(playlistRaw);
    const regexUrls = /'file': '(.*)'/;
    const urlRaw = regexUrls.exec(data)[1];
    return {playlist, urlRaw}
  } else {
    const {data} = await $urlsData.get(`/${kpId}`);
    const regexUrls = /'file': '(.*)'/;
    const urlRaw = regexUrls.exec(data)[1];
    return {playlist: null, urlRaw}
  }
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
export const kpListDTO = (rawData: any) =>
  rawData.map((item) => {
    const kpId = item.kinopoiskId || item.filmId;
    const poster = kpId
      ? `https://cdn.statically.io/img/kinopoiskapiunofficial.tech/f=auto,q=60,h=300/images/posters/kp_small/${kpId}.jpg`
      : 'https://cdn.statically.io/img/i.pinimg.com/f=auto,q=60,h=300/originals/42/2f/83/422f83814d816e55ce6a633f35ec63a4.jpg';
    const title = item.nameRu;
    return { kpId, poster, title };
  });

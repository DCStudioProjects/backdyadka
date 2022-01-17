export const searchDTO = (item: any) => {
  const {
    id,
    title_rus: title,
    kinopoisk_id: kpId,
    poster: defaultPoster,
  } = item;
  let poster = `https://cdn.statically.io/img/kinopoiskapiunofficial.tech/f=auto,q=60,h=300/images/posters/kp/${kpId}.jpg`;

  if (!kpId || !defaultPoster) {
    poster =
      "https://cdn.statically.io/img/i.pinimg.com/f=auto,q=60,h=300/originals/42/2f/83/422f83814d816e55ce6a633f35ec63a4.jpg";
  }
  return { id, kpId, poster, title };
};

import { $kpdata, $mediaData } from "../api/ApiVars";
import { StaffData } from "../interfaces/IFilm";

export const getData = async (kpId: string) => {
  const { data: rawData } = await $kpdata.get(`/v2.2/films/${kpId}`);
  const {
    countries: countriesRaw,
    description,
    genres: genresRaw,
    kinopoiskId,
    nameOriginal,
    nameRu,
    ratingAgeLimits,
    ratingImdb,
    ratingKinopoisk,
    serial,
    year,
  } = rawData;

  const countries = countriesRaw.map(({ country }) => country).join(", ");
  const genres = genresRaw.map(({ genre }) => genre).join(", ");

  return {
    age: `${ratingAgeLimits?.slice(3) || "16"}+`,
    countries,
    description,
    genres,
    isSeries: serial,
    kpId: kinopoiskId,
    origTitle: nameOriginal,
    ratings: { imdb: ratingImdb, kinopoisk: ratingKinopoisk },
    title: nameRu,
    year,
  };
};

export const getMediaData = async (kpId: string) => {
  const {
    data: { result: data },
  } = await $mediaData.get(
    `/search?token=${process.env.MEDIA_KEY}&kinopoisk_id=${kpId}`
  );
  const { translations } = data[0];

  return { translations: translations || [] };
};

export const getStaff = async (kpId: string) => {
  const { data } = await $kpdata.get(`/v1/staff?filmId=${kpId}`);
  const directors = data
    .filter((res: StaffData) => {
      if (res?.professionKey === "DIRECTOR") {
        return res;
      }
    })
    .slice(0, 3)
    .map(({ nameRu, staffId }) => {
      return {
        kpId: staffId,
        poster: `https://kinopoiskapiunofficial.tech/images/actor_posters/kp/${staffId}.jpg`,
        role: "Режиссёр",
        title: nameRu,
      };
    });
  const actors = data
    .filter((res: StaffData) => {
      if (res?.professionKey === "ACTOR") {
        return res;
      }
    })
    .slice(0, 10)
    .map(({ nameRu, staffId }) => {
      return {
        kpId: staffId,
        poster: `https://kinopoiskapiunofficial.tech/images/actor_posters/kp/${staffId}.jpg`,
        role: "Актёр",
        title: nameRu,
      };
    });

  return directors.concat(actors);
};

export const getSeasons = async (kpId: string) => {
  const {
    data: { items: rawData },
  } = await $kpdata.get(`/v2.2/films/${kpId}/seasons`);
  const data = rawData.map(({ episodes, number }) => {
    const episodesData = episodes.map(({ episodeNumber }) => {
      return {
        episode: episodeNumber,
        poster: `https://cdn.statically.io/img/blackmedia.top/f=auto,q=80/media/${kpId}/preview_app_cinema_media_${kpId}_s${number}e${episodeNumber}.png`,
      };
    });
    return { season: number, episodes: episodesData };
  });
  return data;
};

export const getSimilars = async (kpId: string) => {
  const {
    data: { items: rawData },
  } = await $kpdata.get(`/v2.2/films/${kpId}/similars`);
  const data = rawData.map(({ nameRu, filmId }) => {
    return {
      kpId: filmId,
      poster: `https://kinopoiskapiunofficial.tech/images/posters/kp_small/${filmId}.jpg`,
      title: nameRu,
    };
  });
  return data;
};

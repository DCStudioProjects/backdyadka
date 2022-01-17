export interface FilmBody {
  kpId: string;
}

export interface TranslationsData {
  default: Translation;
  list: Translation[];
}

export interface Translation {
  id: number;
  name: string;
  params?: TranslationParams;
}

export interface TranslationParams {
  is_camrip: "0" | "1";
  is_ads: "0" | "1";
  is_director: "0" | "1";
}

export interface StaffData {
  description: string | null;
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  professionKey: string;
  professionText: string;
  staffId: number;
}

export interface SearchRaw {}

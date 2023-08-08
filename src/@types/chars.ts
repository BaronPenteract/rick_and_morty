import { ECharGender, ECharStatus } from "../utils/constants";

export type TStatus = ECharStatus;
export type TGender = ECharGender;

export type CharType = {
  id: number;
  name: string;
  status: TStatus;
  species: string;
  type: string;
  gender: TGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
  isLiked?: boolean;
};

export type TFetchCharsResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharType[];
};

export interface IFilterParamsChars {
  page?: number | null;
  name?: string;
  status?: TStatus;
  gender?: TGender;
}

export type TFetchCharResponse = CharType;

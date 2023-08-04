export type CharType = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
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
  status?: "alive" | "dead" | "unknown";
  gender?: "female" | "male" | "genderless" | "unknown";
}

export type TFetchCharResponse = CharType;

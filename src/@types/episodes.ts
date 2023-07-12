export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IFetchEpisodesResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: IEpisode[];
}

export interface IFilterParamsEpisodes {
  page?: number | null;
  name?: string;
  episode?: string;
}

export interface IFetchSingleEpisodeResponse extends IEpisode {}

export interface IEpisodeProps {
  episode: IEpisode;
  onClick: (id: number) => void;
}

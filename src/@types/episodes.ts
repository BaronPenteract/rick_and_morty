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

export interface IFetchSingleEpisodeResponse extends IEpisode {}

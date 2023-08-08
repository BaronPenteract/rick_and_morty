export const BASE_URL = "https://rickandmortyapi.com/api";
export const rootPath = "/rick_and_morty";
export const PROJECT_TITLE = "Rick And Morty Explorer";

export const INTERNET_CONNTECTION_ERROR = "Check your internet connection.";
export const NOT_FOUND_ERROR = "404 Not found.";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export enum ECharStatus {
  ALIVE = "alive",
  DEAD = "dead",
  UNKNOWN = "unknown",
}

export enum ECharGender {
  FEMALE = "Female",
  MALE = "Male",
  GANDERLESS = "Genderless",
  UNKNOWN = "unknown",
}

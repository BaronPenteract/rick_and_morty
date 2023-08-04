import { CharType } from "../@types/chars";

const setFavCharsToLS = (favChars: CharType[]) => {
  localStorage.setItem("favChars", JSON.stringify(favChars));
};

const getFavCharsFromLS = () => {
  const isFavCharsLS = localStorage.getItem("favChars");
  let favCharsLS: CharType[] = [];

  if (isFavCharsLS) {
    favCharsLS = isFavCharsLS ? JSON.parse(isFavCharsLS) : ([] as CharType[]);
  }

  return favCharsLS;
};

export { setFavCharsToLS, getFavCharsFromLS };

export const getIdFromURL: (urlString: string) => number = (urlString) => {
  const urtToArray = urlString.split("/");
  return Number(urtToArray[urtToArray.length - 1]);
};

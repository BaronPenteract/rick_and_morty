export const getPageFromURL: (url: string | null) => number | null = (url) => {
  if (!url) {
    return null;
  }

  return Number(url.split("page=")[1]);
};

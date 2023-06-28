export const getPageFromURL: (urlString: string | null) => number | null = (
  urlString
) => {
  if (!urlString) {
    return null;
  }

  const url = new URL(urlString);

  return Number(url.searchParams.get("page"));
};

import { INavItem } from "../@types/mainComponent";
import { PROJECT_TITLE, rootPath } from "./constants";

import mainBG from "../assets/images/main-bg.jpg";
import charactersBG from "../assets/images/chars-bg.png";
import locationsBG from "../assets/images/locs-bg.jpg";
import episodesBG from "../assets/images/episodes-bg.jpg";
import favoriteBG from "../assets/images/favorite-bg.jpg";

export const defaultNavItem: INavItem = {
  title: PROJECT_TITLE,
  to: rootPath,
  image: mainBG,
};

export const navItems: INavItem[] = [
  defaultNavItem,
  { title: "Characters", to: rootPath + "/characters", image: charactersBG },
  { title: "Locations", to: rootPath + "/locations", image: locationsBG },
  { title: "Episodes", to: rootPath + "/episodes", image: episodesBG },
  {
    title: "Favorite",
    to: rootPath + "/favorite-characters",
    image: favoriteBG,
  },
];

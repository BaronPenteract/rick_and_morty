import React from "react";

import ApiLink from "../ApiLink";
import styles from "./index.module.scss";
import GitHubLink from "../GitHubLink";
import { PROJECT_TITLE, rootPath } from "../../utils/constants";
import { Link } from "react-router-dom";

const NavTab: React.FC = () => {
  return (
    <nav className={`${styles.root}`}>
      <Link className={styles.root__link} to={rootPath + "/characters"}>
        characters
      </Link>
      <Link
        className={styles.root__link}
        to={rootPath + "/favorite-characters"}
      >
        favoriteChars
      </Link>
    </nav>
  );
};

export default NavTab;

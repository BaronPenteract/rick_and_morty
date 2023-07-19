import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { rootPath } from "../../utils/constants";

const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <Link to={rootPath + "/"}>HEADER</Link>
        <Link to={rootPath + "/characters"}>characters</Link>
        <Link to={rootPath + "/favorite-characters"}>favoriteChars</Link>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <Link to="/">HEADER</Link>
      </div>
    </header>
  );
};

export default Header;

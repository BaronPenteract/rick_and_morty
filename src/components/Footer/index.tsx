import React from "react";
import ApiLink from "../ApiLink";
import styles from "./index.module.scss";
import GitHubLink from "../GitHubLink";

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.content}></div>
        <div className={styles.info}>
          <ApiLink />
          <GitHubLink />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

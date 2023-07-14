import React from "react";

import { ReactComponent as Pentagon } from "../../assets/images/github-svgrepo-com.svg";
import styles from "./index.module.scss";

const GitHubLink: React.FC = () => {
  return (
    <a
      className={styles.root}
      href="https://github.com/BaronPenteract"
      target="_blank"
      rel="noreferrer"
      title="BaronPenteract GitHub"
    >
      <Pentagon />
      BaronPenteract
    </a>
  );
};

export default GitHubLink;

import React from "react";
import { IEpisode } from "../../@types/episodes";

import styles from "./index.module.scss";

interface IEpisodeProps {
  episode: IEpisode;
}

const Episode: React.FC<IEpisodeProps> = ({ episode }) => {
  const { id, name, episode: code, characters, url } = episode;
  const [isAdded, setIsAdded] = React.useState(false);

  return (
    <article>
      <div className={`${styles.root}`}>
        <div className={styles.header}>header</div>
        <div className={styles.content}>
          <h2 className={styles.name} title="Name">
            {name}
          </h2>
        </div>
      </div>
    </article>
  );
};

export default Episode;

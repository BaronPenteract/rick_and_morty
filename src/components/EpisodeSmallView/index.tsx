import React from "react";
import { IEpisodeProps } from "../../@types/episodes";

import styles from "./index.module.scss";

const EpisodeSmallView: React.FC<IEpisodeProps> = ({ episode, onClick }) => {
  const { id, name, episode: code, characters, url } = episode;

  const handleEpisodeClick: React.MouseEventHandler = (e) => {
    onClick(id);
  };

  return (
    <article>
      <div className={`${styles.root}`}>
        <div className={styles.header} onClick={handleEpisodeClick}>
          <p className={styles.number}>{id}</p>
        </div>
        <div className={styles.content}>
          <h2 className={styles.name} title={name} onClick={handleEpisodeClick}>
            {name}
          </h2>
        </div>
      </div>
    </article>
  );
};

export default EpisodeSmallView;

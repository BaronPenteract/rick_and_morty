import React from "react";
import { useNavigate } from "react-router-dom";

import { IEpisode } from "../../@types/episodes";
import { rootPath } from "../../utils/constants";

import EpisodeSmallView from "../EpisodeSmallView";

import styles from "./index.module.scss";

interface IEpisodesListProps {
  episodes: IEpisode[];
}

const EpisodesSmallList: React.FC<IEpisodesListProps> = ({ episodes }) => {
  const navigate = useNavigate();

  const handleEpisodeClick: (episodeId: number) => void = (episodeId) => {
    navigate(rootPath + "/episode/" + episodeId);
  };

  return (
    <ul className={styles.root}>
      {episodes.map((episode) => (
        <li key={episode.id}>
          <EpisodeSmallView episode={episode} onClick={handleEpisodeClick} />
        </li>
      ))}
    </ul>
  );
};

export default EpisodesSmallList;
